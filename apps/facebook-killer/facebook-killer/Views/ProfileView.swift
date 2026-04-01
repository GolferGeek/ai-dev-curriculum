import SwiftUI
import SwiftData
import PhotosUI

struct ProfileView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    @State private var isEditing = false
    @State private var editName = ""
    @State private var editBio = ""
    @State private var editAvatarItem: PhotosPickerItem?
    @State private var editAvatarData: Data?

    private var currentUser: User? { currentUsers.first }

    private var userPosts: [Post] {
        guard let currentUser else { return [] }
        return currentUser.posts.sorted { $0.timestamp > $1.timestamp }
    }

    var body: some View {
        NavigationStack {
            if let currentUser {
                List {
                    Section {
                        HStack(spacing: 16) {
                            if let avatarData = currentUser.avatarData, let uiImage = UIImage(data: avatarData) {
                                Image(uiImage: uiImage)
                                    .resizable()
                                    .scaledToFill()
                                    .frame(width: 64, height: 64)
                                    .clipShape(Circle())
                            } else {
                                Image(systemName: "person.circle.fill")
                                    .resizable()
                                    .frame(width: 64, height: 64)
                                    .foregroundStyle(.secondary)
                            }
                            VStack(alignment: .leading) {
                                Text(currentUser.name)
                                    .font(.title2.bold())
                                    .accessibilityIdentifier("profile_name")
                                Text(currentUser.bio)
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                                    .accessibilityIdentifier("profile_bio")
                                Text("\(currentUser.friendCount) friends")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                                    .accessibilityIdentifier("profile_friend_count")
                            }
                        }
                    }

                    Section("My Posts") {
                        if userPosts.isEmpty {
                            Text("No posts yet")
                                .foregroundStyle(.secondary)
                        } else {
                            ForEach(userPosts) { post in
                                PostRowView(post: post, currentUser: currentUser)
                            }
                        }
                    }
                }
                .navigationTitle("Profile")
                .toolbar {
                    Button("Edit") {
                        editName = currentUser.name
                        editBio = currentUser.bio
                        editAvatarData = currentUser.avatarData
                        isEditing = true
                    }
                    .accessibilityIdentifier("profile_edit_button")
                }
                .sheet(isPresented: $isEditing) {
                    editProfileSheet(for: currentUser)
                }
            }
        }
    }

    private func editProfileSheet(for user: User) -> some View {
        NavigationStack {
            Form {
                Section("Edit Profile") {
                    TextField("Name", text: $editName)
                        .accessibilityIdentifier("edit_name_field")
                    TextField("Bio", text: $editBio)
                        .accessibilityIdentifier("edit_bio_field")
                }

                Section("Photo") {
                    PhotosPicker(selection: $editAvatarItem, matching: .images) {
                        if let editAvatarData, let uiImage = UIImage(data: editAvatarData) {
                            Image(uiImage: uiImage)
                                .resizable()
                                .scaledToFill()
                                .frame(width: 60, height: 60)
                                .clipShape(Circle())
                        } else {
                            Label("Select Photo", systemImage: "photo")
                        }
                    }
                    .onChange(of: editAvatarItem) { _, newItem in
                        Task {
                            if let data = try? await newItem?.loadTransferable(type: Data.self) {
                                editAvatarData = data
                            }
                        }
                    }
                }
            }
            .navigationTitle("Edit Profile")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { isEditing = false }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        user.name = editName.trimmingCharacters(in: .whitespacesAndNewlines)
                        user.bio = editBio.trimmingCharacters(in: .whitespacesAndNewlines)
                        user.avatarData = editAvatarData
                        try? modelContext.save()
                        isEditing = false
                    }
                    .disabled(editName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ||
                              editBio.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                    .accessibilityIdentifier("edit_save_button")
                }
            }
        }
    }
}
