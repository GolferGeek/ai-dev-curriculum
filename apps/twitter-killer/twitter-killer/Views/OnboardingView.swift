import SwiftUI
import SwiftData

enum OnboardingField {
    case name, handle
}

struct OnboardingView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @State private var name: String = ""
    @State private var handle: String = ""
    @FocusState private var focusedField: OnboardingField?

    private var isFormValid: Bool {
        !name.trimmingCharacters(in: .whitespaces).isEmpty &&
        !handle.trimmingCharacters(in: .whitespaces).isEmpty
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Spacer()

                Text("Welcome to Chirp")
                    .font(.largeTitle)
                    .fontWeight(.bold)

                Text("Create your profile to get started")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                VStack(spacing: 16) {
                    TextField("Name", text: $name)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.name)
                        .focused($focusedField, equals: .name)
                        .accessibilityIdentifier("onboarding_name_field")

                    TextField("Handle", text: $handle)
                        .textFieldStyle(.roundedBorder)
                        .textContentType(.username)
                        .autocapitalization(.none)
                        .focused($focusedField, equals: .handle)
                        .accessibilityIdentifier("onboarding_handle_field")
                }
                .padding(.horizontal, 32)

                Button("Get Started") {
                    createUser()
                }
                .buttonStyle(.borderedProminent)
                .disabled(!isFormValid)
                .accessibilityIdentifier("onboarding_get_started_button")

                Spacer()
                Spacer()
            }
            .padding()
            .onAppear {
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                    focusedField = .name
                }
            }
        }
    }

    private func createUser() {
        let trimmedName = name.trimmingCharacters(in: .whitespaces)
        let trimmedHandle = handle.trimmingCharacters(in: .whitespaces)
        let user = User(name: trimmedName, handle: trimmedHandle)
        modelContext.insert(user)
        try? modelContext.save()
        currentUserHandle = trimmedHandle
    }
}
