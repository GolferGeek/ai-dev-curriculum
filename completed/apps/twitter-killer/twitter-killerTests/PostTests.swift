import XCTest
import SwiftData
@testable import twitter_killer

final class PostTests: XCTestCase {
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

    func testPostCreation() throws {
        let user = User(name: "Alice", handle: "alice")
        context.insert(user)

        let post = Post(text: "Hello world!", author: user)
        context.insert(post)
        try context.save()

        let descriptor = FetchDescriptor<Post>()
        let posts = try context.fetch(descriptor)
        XCTAssertEqual(posts.count, 1)
        XCTAssertEqual(posts.first?.text, "Hello world!")
        XCTAssertEqual(posts.first?.author?.handle, "alice")
        XCTAssertNotNil(posts.first?.timestamp)
    }

    func testPostAuthorRelationship() throws {
        let user = User(name: "Bob", handle: "bob")
        context.insert(user)

        let post1 = Post(text: "First post", author: user)
        let post2 = Post(text: "Second post", author: user)
        context.insert(post1)
        context.insert(post2)
        try context.save()

        let userDescriptor = FetchDescriptor<User>()
        let users = try context.fetch(userDescriptor)
        XCTAssertEqual(users.first?.posts.count, 2)
    }
}
