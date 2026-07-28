import SwiftUI
import SwiftData
import PhotosUI

struct ComposeView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    @State private var text = ""
    @State private var photoItem: PhotosPickerItem?
    @State private var photoData: Data?
    @State private var showPostedAlert = false

    private var currentUser: User? { currentUsers.first }

    private var isValid: Bool {
        !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("What's on your mind?") {
                    TextEditor(text: $text)
                        .frame(minHeight: 100)
                        .accessibilityIdentifier("compose_text_field")
                }

                Section("Photo (optional)") {
                    PhotosPicker(selection: $photoItem, matching: .images) {
                        if let photoData, let uiImage = UIImage(data: photoData) {
                            Image(uiImage: uiImage)
                                .resizable()
                                .scaledToFit()
                                .frame(maxHeight: 150)
                                .clipShape(RoundedRectangle(cornerRadius: 8))
                        } else {
                            Label("Add Photo", systemImage: "photo")
                        }
                    }
                    .accessibilityIdentifier("compose_photo_picker")
                    .onChange(of: photoItem) { _, newItem in
                        Task {
                            if let data = try? await newItem?.loadTransferable(type: Data.self) {
                                photoData = data
                            }
                        }
                    }
                }

                Section {
                    Button("Post") {
                        createPost()
                    }
                    .disabled(!isValid)
                    .accessibilityIdentifier("compose_post_button")
                }
            }
            .navigationTitle("Compose")
            .alert("Posted!", isPresented: $showPostedAlert) {
                Button("OK", role: .cancel) { }
            } message: {
                Text("Your post is now in the feed.")
            }
        }
    }

    private func createPost() {
        guard let currentUser else { return }
        let post = Post(
            text: text.trimmingCharacters(in: .whitespacesAndNewlines),
            photoData: photoData,
            author: currentUser
        )
        modelContext.insert(post)
        try? modelContext.save()
        text = ""
        photoData = nil
        photoItem = nil
        showPostedAlert = true
    }
}
