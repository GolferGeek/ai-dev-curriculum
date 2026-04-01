import XCTest
import SwiftData
@testable import twitter_killer

final class UserTests: XCTestCase {
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

    func testUserCreation() throws {
        let user = User(name: "Alice", handle: "alice", bio: "Hello world")
        context.insert(user)
        try context.save()

        let descriptor = FetchDescriptor<User>()
        let users = try context.fetch(descriptor)
        XCTAssertEqual(users.count, 1)
        XCTAssertEqual(users.first?.name, "Alice")
        XCTAssertEqual(users.first?.handle, "alice")
        XCTAssertEqual(users.first?.bio, "Hello world")
        XCTAssertNotNil(users.first?.createdAt)
    }

    func testUserDefaultValues() throws {
        let user = User(name: "Bob", handle: "bob")
        context.insert(user)
        try context.save()

        let descriptor = FetchDescriptor<User>()
        let users = try context.fetch(descriptor)
        XCTAssertEqual(users.first?.bio, "")
        XCTAssertNil(users.first?.avatarData)
        XCTAssertEqual(users.first?.posts.count, 0)
    }
}
