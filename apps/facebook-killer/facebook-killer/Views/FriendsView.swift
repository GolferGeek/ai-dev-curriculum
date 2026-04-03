import SwiftUI
import SwiftData

struct FriendsView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    @Query private var allUsers: [User]

    private var currentUser: User? { currentUsers.first }

    private var pendingRequests: [Friendship] {
        currentUser?.receivedRequests.filter { $0.statusRaw == "pending" } ?? []
    }

    private var myFriends: [User] {
        currentUser?.friends ?? []
    }

    private var discoverUsers: [User] {
        guard let currentUser else { return [] }
        let friendIDs = Set(myFriends.map { $0.persistentModelID })
        let pendingIDs = Set(
            (currentUser.sentRequests.map { $0.toUser?.persistentModelID } +
             currentUser.receivedRequests.map { $0.fromUser?.persistentModelID })
                .compactMap { $0 }
        )
        return allUsers.filter { user in
            !user.isCurrentUser &&
            !friendIDs.contains(user.persistentModelID) &&
            !pendingIDs.contains(user.persistentModelID)
        }
    }

    var body: some View {
        NavigationStack {
            List {
                if !pendingRequests.isEmpty {
                    Section("Pending Requests") {
                        ForEach(pendingRequests) { request in
                            HStack {
                                Text(request.fromUser?.name ?? "Unknown")
                                Spacer()
                                Button("Accept") {
                                    request.statusRaw = "accepted"
                                    try? modelContext.save()
                                }
                                .buttonStyle(.borderedProminent)
                                .accessibilityIdentifier("accept_request_\(request.fromUser?.name ?? "")")

                                Button("Decline") {
                                    request.statusRaw = "declined"
                                    try? modelContext.save()
                                }
                                .buttonStyle(.bordered)
                                .accessibilityIdentifier("decline_request_\(request.fromUser?.name ?? "")")
                            }
                        }
                    }
                    .accessibilityIdentifier("pending_section")
                }

                Section("My Friends") {
                    if myFriends.isEmpty {
                        Text("No friends yet")
                            .foregroundStyle(.secondary)
                    } else {
                        ForEach(myFriends) { friend in
                            NavigationLink(destination: UserProfileView(user: friend)) {
                                HStack {
                                    if let avatarData = friend.avatarData, let uiImage = UIImage(data: avatarData) {
                                        Image(uiImage: uiImage)
                                            .resizable()
                                            .scaledToFill()
                                            .frame(width: 32, height: 32)
                                            .clipShape(Circle())
                                    } else {
                                        Image(systemName: "person.circle.fill")
                                            .resizable()
                                            .frame(width: 32, height: 32)
                                            .foregroundStyle(.secondary)
                                    }
                                    Text(friend.name)
                                }
                            }
                        }
                    }
                }
                .accessibilityIdentifier("friends_section")

                if !discoverUsers.isEmpty {
                    Section("Discover") {
                        ForEach(discoverUsers) { user in
                            HStack {
                                Text(user.name)
                                Spacer()
                                Button("Add Friend") {
                                    sendRequest(to: user)
                                }
                                .buttonStyle(.borderedProminent)
                                .accessibilityIdentifier("add_friend_\(user.name)")
                            }
                        }
                    }
                    .accessibilityIdentifier("discover_section")
                }
            }
            .navigationTitle("Friends")
        }
    }

    private func sendRequest(to user: User) {
        guard let currentUser else { return }
        let friendship = Friendship(fromUser: currentUser, toUser: user, statusRaw: "pending")
        modelContext.insert(friendship)
        try? modelContext.save()
    }
}
