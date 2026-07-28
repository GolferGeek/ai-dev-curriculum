import SwiftUI
import SwiftData

struct DiscoverUsersView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @Query(sort: \User.name) private var allUsers: [User]
    @Query private var allFollows: [Follow]

    private var otherUsers: [User] {
        allUsers.filter { $0.handle != currentUserHandle }
    }

    var body: some View {
        Group {
            if otherUsers.isEmpty {
                ContentUnavailableView(
                    "No Other Users",
                    systemImage: "person.2.slash",
                    description: Text("You're the only user so far.")
                )
                .accessibilityIdentifier("discover_empty_state")
            } else {
                List(otherUsers) { user in
                    NavigationLink {
                        UserProfileView(user: user)
                    } label: {
                        HStack {
                            VStack(alignment: .leading) {
                                Text(user.name)
                                    .fontWeight(.medium)
                                Text("@\(user.handle)")
                                    .font(.caption)
                                    .foregroundStyle(.secondary)
                            }

                            Spacer()

                            if isFollowing(user) {
                                Text("Following")
                                    .font(.caption)
                                    .foregroundStyle(.green)
                            }
                        }
                    }
                    .accessibilityIdentifier("discover_user_row_\(user.handle)")
                }
                .listStyle(.plain)
                .accessibilityIdentifier("discover_users_list")
            }
        }
        .navigationTitle("Discover Users")
    }

    private func isFollowing(_ user: User) -> Bool {
        allFollows.contains { follow in
            follow.follower?.handle == currentUserHandle && follow.followed?.handle == user.handle
        }
    }
}
