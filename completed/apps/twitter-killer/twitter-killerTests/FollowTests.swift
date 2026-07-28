import XCTest
import SwiftData
@testable import twitter_killer

final class FollowTests: XCTestCase {
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

    func testFollowCreation() throws {
        let alice = User(name: "Alice", handle: "alice")
        let bob = User(name: "Bob", handle: "bob")
        context.insert(alice)
        context.insert(bob)

        let follow = Follow(follower: alice, followed: bob)
        context.insert(follow)
        try context.save()

        let descriptor = FetchDescriptor<Follow>()
        let follows = try context.fetch(descriptor)
        XCTAssertEqual(follows.count, 1)
        XCTAssertEqual(follows.first?.follower?.handle, "alice")
        XCTAssertEqual(follows.first?.followed?.handle, "bob")
    }

    func testUnfollow() throws {
        let alice = User(name: "Alice", handle: "alice")
        let bob = User(name: "Bob", handle: "bob")
        context.insert(alice)
        context.insert(bob)

        let follow = Follow(follower: alice, followed: bob)
        context.insert(follow)
        try context.save()

        var descriptor = FetchDescriptor<Follow>()
        var follows = try context.fetch(descriptor)
        XCTAssertEqual(follows.count, 1)

        context.delete(follow)
        try context.save()

        descriptor = FetchDescriptor<Follow>()
        follows = try context.fetch(descriptor)
        XCTAssertEqual(follows.count, 0)
    }
}
