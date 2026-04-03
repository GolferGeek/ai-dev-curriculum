import SwiftUI
import SwiftData

struct UserProfileView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @Query private var allFollows: [Follow]

    let user: User

    private var isFollowing: Bool {
        allFollows.contains { follow in
            follow.follower?.handle == currentUserHandle && follow.followed?.handle == user.handle
        }
    }

    private var isCurrentUser: Bool {
        user.handle == currentUserHandle
    }

    var body: some View {
        List {
            Section {
                VStack(alignment: .leading, spacing: 8) {
                    Text(user.name)
                        .font(.title2)
                        .fontWeight(.bold)
                        .accessibilityIdentifier("user_profile_name")

                    Text("@\(user.handle)")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                        .accessibilityIdentifier("user_profile_handle")

                    if !user.bio.isEmpty {
                        Text(user.bio)
                            .font(.body)
                    }

                    Text("\(user.posts.count) posts")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                        .accessibilityIdentifier("user_profile_post_count")

                    if !isCurrentUser {
                        Button(isFollowing ? "Unfollow" : "Follow") {
                            toggleFollow()
                        }
                        .buttonStyle(.borderedProminent)
                        .tint(isFollowing ? .red : .blue)
                        .accessibilityIdentifier("user_profile_follow_button")
                    }
                }
                .padding(.vertical, 4)
            }

            Section("Posts") {
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
        .navigationTitle("@\(user.handle)")
    }

    private func toggleFollow() {
        if isFollowing {
            // Unfollow
            if let follow = allFollows.first(where: {
                $0.follower?.handle == currentUserHandle && $0.followed?.handle == user.handle
            }) {
                modelContext.delete(follow)
                try? modelContext.save()
            }
        } else {
            // Follow
            let handle = currentUserHandle
            let descriptor = FetchDescriptor<User>(
                predicate: #Predicate { $0.handle == handle }
            )
            guard let currentUser = try? modelContext.fetch(descriptor).first else { return }
            let follow = Follow(follower: currentUser, followed: user)
            modelContext.insert(follow)
            try? modelContext.save()
        }
    }
}
