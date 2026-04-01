import SwiftUI
import SwiftData

struct FeedView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    @Query(sort: \Post.timestamp, order: .reverse) private var allPosts: [Post]

    private var currentUser: User? { currentUsers.first }

    private var feedPosts: [Post] {
        guard let currentUser else { return [] }
        let friendIDs = Set(currentUser.friends.map { $0.persistentModelID })
        return allPosts.filter { post in
            guard let author = post.author else { return false }
            return author.persistentModelID == currentUser.persistentModelID ||
                   friendIDs.contains(author.persistentModelID)
        }
    }

    var body: some View {
        NavigationStack {
            Group {
                if feedPosts.isEmpty {
                    ContentUnavailableView(
                        "No posts yet",
                        systemImage: "text.bubble",
                        description: Text("Add friends and start posting!")
                    )
                    .accessibilityIdentifier("feed_empty_state")
                } else {
                    List(feedPosts) { post in
                        if let currentUser {
                            PostRowView(post: post, currentUser: currentUser)
                        }
                    }
                    .listStyle(.plain)
                    .accessibilityIdentifier("feed_list")
                }
            }
            .navigationTitle("Feed")
        }
    }
}
