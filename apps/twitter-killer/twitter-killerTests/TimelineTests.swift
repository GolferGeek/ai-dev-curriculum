import XCTest
import SwiftData
@testable import twitter_killer

final class TimelineTests: XCTestCase {
    private var container: ModelContainer!
    private var context: ModelContext!

    override func setUpWithError() throws {
        let schema = Schema([User.self, Post.self, Follow.self])
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        container = try ModelContainer(for: schema, configurations: [config])
        context = ModelContext(container)
    }

    override func tearDown() {
        container = nil
        context = nil
    }

    func testTimelineFiltering() throws {
        let alice = User(name: "Alice", handle: "alice")
        let bob = User(name: "Bob", handle: "bob")
        let carol = User(name: "Carol", handle: "carol")
        context.insert(alice)
        context.insert(bob)
        context.insert(carol)

        // Alice follows Bob but not Carol
        let follow = Follow(follower: alice, followed: bob)
        context.insert(follow)

        // Everyone posts
        let postAlice = Post(text: "Alice's post", author: alice)
        let postBob = Post(text: "Bob's post", author: bob)
        let postCarol = Post(text: "Carol's post", author: carol)
        context.insert(postAlice)
        context.insert(postBob)
        context.insert(postCarol)
        try context.save()

        // Simulate timeline filtering for Alice
        let followDescriptor = FetchDescriptor<Follow>()
        let follows = try context.fetch(followDescriptor)
        let followedHandles = Set(
            follows
                .filter { $0.follower?.handle == "alice" }
                .compactMap { $0.followed?.handle }
        )

        let postDescriptor = FetchDescriptor<Post>(
            sortBy: [SortDescriptor(\.timestamp, order: .reverse)]
        )
        let allPosts = try context.fetch(postDescriptor)
        let timelinePosts = allPosts.filter { post in
            guard let authorHandle = post.author?.handle else { return false }
            return authorHandle == "alice" || followedHandles.contains(authorHandle)
        }

        // Alice should see her own post and Bob's post, but not Carol's
        XCTAssertEqual(timelinePosts.count, 2)
        let handles = Set(timelinePosts.compactMap { $0.author?.handle })
        XCTAssertTrue(handles.contains("alice"))
        XCTAssertTrue(handles.contains("bob"))
        XCTAssertFalse(handles.contains("carol"))
    }
}
