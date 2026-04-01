import SwiftUI
import SwiftData

struct ProfileView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @Query private var allFollows: [Follow]
    @State private var isEditing: Bool = false
    @State private var editName: String = ""
    @State private var editBio: String = ""

    private var currentUser: User? {
        let handle = currentUserHandle
        let descriptor = FetchDescriptor<User>(
            predicate: #Predicate { $0.handle == handle }
        )
        return try? modelContext.fetch(descriptor).first
    }

    private var followerCount: Int {
        allFollows.filter { $0.followed?.handle == currentUserHandle }.count
    }

    private var followingCount: Int {
        allFollows.filter { $0.follower?.handle == currentUserHandle }.count
    }

    var body: some View {
        Group {
            if let user = currentUser {
                List {
                    Section {
                        VStack(alignment: .leading, spacing: 8) {
                            Text(user.name)
                                .font(.title2)
                                .fontWeight(.bold)
                                .accessibilityIdentifier("profile_name")

                            Text("@\(user.handle)")
                                .font(.subheadline)
                                .foregroundStyle(.secondary)
                                .accessibilityIdentifier("profile_handle")

                            if !user.bio.isEmpty {
                                Text(user.bio)
                                    .font(.body)
                            }

                            HStack(spacing: 16) {
                                VStack {
                                    Text("\(user.posts.count)")
                                        .fontWeight(.bold)
                                    Text("Posts")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                                .accessibilityIdentifier("profile_post_count")

                                VStack {
                                    Text("\(followerCount)")
                                        .fontWeight(.bold)
                                    Text("Followers")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }

                                VStack {
                                    Text("\(followingCount)")
                                        .fontWeight(.bold)
                                    Text("Following")
                                        .font(.caption)
                                        .foregroundStyle(.secondary)
                                }
                            }
                            .padding(.top, 4)
                        }
                        .padding(.vertical, 4)
                    }

                    Section("Actions") {
                        NavigationLink {
                            DiscoverUsersView()
                        } label: {
                            Label("Discover Users", systemImage: "person.badge.plus")
                        }
                        .accessibilityIdentifier("profile_discover_users")

                        Button("Edit Profile") {
                            editName = user.name
                            editBio = user.bio
                            isEditing = true
                        }
                        .accessibilityIdentifier("profile_edit_button")

                        Button("Sign Out", role: .destructive) {
                            signOut()
                        }
                        .accessibilityIdentifier("profile_sign_out_button")
                    }

                    Section("My Posts") {
                        let sortedPosts = user.posts.sorted { $0.timestamp > $1.timestamp }
                        if sortedPosts.isEmpty {
                            Text("No posts yet")
                                .foregroundStyle(.secondary)
                        } else {
                            ForEach(sortedPosts) { post in
                                PostCellView(post: post)
                            }
                        }
                    }
                }
                .listStyle(.insetGrouped)
            } else {
                ContentUnavailableView("Profile Not Found", systemImage: "person.slash")
            }
        }
        .navigationTitle("Profile")
        .sheet(isPresented: $isEditing) {
            editProfileSheet
        }
    }

    private var editProfileSheet: some View {
        NavigationStack {
            Form {
                TextField("Name", text: $editName)
                    .accessibilityIdentifier("edit_name_field")
                TextField("Bio", text: $editBio)
                    .accessibilityIdentifier("edit_bio_field")
            }
            .navigationTitle("Edit Profile")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") { isEditing = false }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        if let user = currentUser {
                            user.name = editName
                            user.bio = editBio
                            try? modelContext.save()
                        }
                        isEditing = false
                    }
                    .accessibilityIdentifier("edit_save_button")
                }
            }
        }
    }

    private func signOut() {
        currentUserHandle = ""
    }
}
