import SwiftUI
import SwiftData

struct ComposeView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @State private var postText: String = ""
    @State private var showConfirmation: Bool = false

    private var isPostValid: Bool {
        !postText.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }

    var body: some View {
        VStack(spacing: 16) {
            TextEditor(text: $postText)
                .frame(minHeight: 150)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.secondary.opacity(0.3), lineWidth: 1)
                )
                .accessibilityIdentifier("compose_text_editor")

            if showConfirmation {
                Text("Post published!")
                    .foregroundStyle(.green)
                    .font(.caption)
                    .accessibilityIdentifier("compose_confirmation")
            }

            Button("Post") {
                publishPost()
            }
            .buttonStyle(.borderedProminent)
            .disabled(!isPostValid)
            .accessibilityIdentifier("compose_post_button")

            Spacer()
        }
        .padding()
        .navigationTitle("Compose")
    }

    private func publishPost() {
        let handle = currentUserHandle
        let descriptor = FetchDescriptor<User>(
            predicate: #Predicate { $0.handle == handle }
        )
        guard let user = try? modelContext.fetch(descriptor).first else { return }

        let post = Post(text: postText.trimmingCharacters(in: .whitespacesAndNewlines), author: user)
        modelContext.insert(post)
        try? modelContext.save()
        postText = ""
        showConfirmation = true

        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
            showConfirmation = false
        }
    }
}
