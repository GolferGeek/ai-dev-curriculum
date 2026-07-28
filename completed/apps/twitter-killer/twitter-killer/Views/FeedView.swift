import SwiftUI
import SwiftData

struct FeedView: View {
    @Environment(\.modelContext) private var modelContext
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""
    @Query(sort: \Post.timestamp, order: .reverse) private var allPosts: [Post]
    @Query private var allFollows: [Follow]

    private var currentUser: User? {
        allPosts.first(where: { $0.author?.handle == currentUserHandle })?.author
            ?? fetchCurrentUser()
    }

    private var feedPosts: [Post] {
        guard let currentUser = currentUser else { return [] }
        let followedHandles = Set(
            allFollows
                .filter { $0.follower?.handle == currentUserHandle }
                .compactMap { $0.followed?.handle }
        )
        return allPosts.filter { post in
            guard let authorHandle = post.author?.handle else { return false }
            return authorHandle == currentUserHandle || followedHandles.contains(authorHandle)
        }
    }

    var body: some View {
        Group {
            if feedPosts.isEmpty {
                ContentUnavailableView(
                    "No Posts Yet",
                    systemImage: "text.bubble",
                    description: Text("Compose a post or follow other users to see their posts here.")
                )
                .accessibilityIdentifier("feed_empty_state")
            } else {
                List(feedPosts) { post in
                    PostCellView(post: post)
                        .accessibilityIdentifier("feed_post_cell")
                }
                .listStyle(.plain)
                .accessibilityIdentifier("feed_list")
            }
        }
        .navigationTitle("Feed")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                NavigationLink {
                    DiscoverUsersView()
                } label: {
                    Image(systemName: "person.badge.plus")
                }
                .accessibilityIdentifier("discover_users_button")
            }
        }
    }

    private func fetchCurrentUser() -> User? {
        let handle = currentUserHandle
        let descriptor = FetchDescriptor<User>(
            predicate: #Predicate { $0.handle == handle }
        )
        return try? modelContext.fetch(descriptor).first
    }
}
