import SwiftUI
import SwiftData
import PhotosUI

struct OnboardingView: View {
    @Environment(\.modelContext) private var modelContext
    @State private var name = ""
    @State private var bio = ""
    @State private var avatarItem: PhotosPickerItem?
    @State private var avatarData: Data?
    @State private var seedSampleData = false

    private var isValid: Bool {
        !name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty &&
        !bio.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        NavigationStack {
            Form {
                Section("Your Profile") {
                    TextField("Name", text: $name)
                        .accessibilityIdentifier("onboarding_name_field")
                    TextField("Bio", text: $bio)
                        .accessibilityIdentifier("onboarding_bio_field")
                }

                Section("Photo (optional)") {
                    PhotosPicker(selection: $avatarItem, matching: .images) {
                        if let avatarData, let uiImage = UIImage(data: avatarData) {
                            Image(uiImage: uiImage)
                                .resizable()
                                .scaledToFill()
                                .frame(width: 80, height: 80)
                                .clipShape(Circle())
                        } else {
                            Label("Select Photo", systemImage: "person.circle.fill")
                        }
                    }
                    .accessibilityIdentifier("onboarding_photo_picker")
                    .onChange(of: avatarItem) { _, newItem in
                        Task {
                            if let data = try? await newItem?.loadTransferable(type: Data.self) {
                                avatarData = data
                            }
                        }
                    }
                }

                Section {
                    Toggle("Load sample data", isOn: $seedSampleData)
                        .accessibilityIdentifier("onboarding_sample_toggle")
                }

                Section {
                    Button("Create Profile") {
                        createProfile()
                    }
                    .disabled(!isValid)
                    .accessibilityIdentifier("onboarding_create_button")
                }
            }
            .navigationTitle("Welcome to Circle")
        }
    }

    private func createProfile() {
        let user = User(
            name: name.trimmingCharacters(in: .whitespacesAndNewlines),
            bio: bio.trimmingCharacters(in: .whitespacesAndNewlines),
            avatarData: avatarData,
            isCurrentUser: true
        )
        modelContext.insert(user)
        try? modelContext.save()

        if seedSampleData {
            SampleData.seed(in: modelContext)
        }
    }
}
