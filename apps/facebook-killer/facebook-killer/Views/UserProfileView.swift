import SwiftUI
import SwiftData

struct UserProfileView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    let user: User

    private var currentUser: User? { currentUsers.first }

    private var friendshipStatus: String? {
        guard let currentUser else { return nil }
        // Check sent requests
        if let sent = currentUser.sentRequests.first(where: { $0.toUser?.persistentModelID == user.persistentModelID }) {
            return sent.statusRaw
        }
        // Check received requests
        if let received = currentUser.receivedRequests.first(where: { $0.fromUser?.persistentModelID == user.persistentModelID }) {
            return received.statusRaw
        }
        return nil
    }

    private var userPosts: [Post] {
        user.posts.sorted { $0.timestamp > $1.timestamp }
    }

    var body: some View {
        List {
            Section {
                HStack(spacing: 16) {
                    if let avatarData = user.avatarData, let uiImage = UIImage(data: avatarData) {
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
                        Text(user.name)
                            .font(.title2.bold())
                            .accessibilityIdentifier("user_profile_name")
                        Text(user.bio)
                            .font(.subheadline)
                            .foregroundStyle(.secondary)
                        Text("\(user.friendCount) friends")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }
            }

            Section {
                friendActionButton
            }

            Section("Posts") {
                if userPosts.isEmpty {
                    Text("No posts yet")
                        .foregroundStyle(.secondary)
                } else {
                    if let currentUser {
                        ForEach(userPosts) { post in
                            PostRowView(post: post, currentUser: currentUser)
                        }
                    }
                }
            }
        }
        .navigationTitle(user.name)
    }

    @ViewBuilder
    private var friendActionButton: some View {
        if let currentUser {
            switch friendshipStatus {
            case "accepted":
                Button("Unfriend", role: .destructive) {
                    unfriend(currentUser: currentUser)
                }
                .accessibilityIdentifier("unfriend_button")
            case "pending":
                Text("Request Pending")
                    .foregroundStyle(.secondary)
            default:
                Button("Add Friend") {
                    addFriend(currentUser: currentUser)
                }
                .accessibilityIdentifier("add_friend_button")
            }
        }
    }

    private func addFriend(currentUser: User) {
        let friendship = Friendship(fromUser: currentUser, toUser: user, statusRaw: "pending")
        modelContext.insert(friendship)
        try? modelContext.save()
    }

    private func unfriend(currentUser: User) {
        if let sent = currentUser.sentRequests.first(where: { $0.toUser?.persistentModelID == user.persistentModelID }) {
            modelContext.delete(sent)
        }
        if let received = currentUser.receivedRequests.first(where: { $0.fromUser?.persistentModelID == user.persistentModelID }) {
            modelContext.delete(received)
        }
        try? modelContext.save()
    }
}
