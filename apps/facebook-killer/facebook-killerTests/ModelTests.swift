import XCTest
import SwiftData
@testable import facebook_killer

final class ModelTests: XCTestCase {
    var container: ModelContainer!
    var context: ModelContext!

    @MainActor
    override func setUp() {
        super.setUp()
        let schema = Schema([User.self, Post.self, Friendship.self, Like.self])
        let config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: true)
        container = try! ModelContainer(for: schema, configurations: [config])
        context = container.mainContext
    }

    override func tearDown() {
        container = nil
        context = nil
        super.tearDown()
    }

    @MainActor
    func testUserCreation() {
        let user = User(name: "Test User", bio: "A test bio", isCurrentUser: true)
        context.insert(user)
        try! context.save()

        let descriptor = FetchDescriptor<User>()
        let users = try! context.fetch(descriptor)
        XCTAssertEqual(users.count, 1)
        XCTAssertEqual(users.first?.name, "Test User")
        XCTAssertEqual(users.first?.bio, "A test bio")
        XCTAssertTrue(users.first?.isCurrentUser ?? false)
    }

    @MainActor
    func testPostCreation() {
        let user = User(name: "Author", bio: "Writer", isCurrentUser: true)
        context.insert(user)
        let post = Post(text: "Hello world", author: user)
        context.insert(post)
        try! context.save()

        let descriptor = FetchDescriptor<Post>()
        let posts = try! context.fetch(descriptor)
        XCTAssertEqual(posts.count, 1)
        XCTAssertEqual(posts.first?.text, "Hello world")
        XCTAssertEqual(posts.first?.author?.name, "Author")
        XCTAssertEqual(posts.first?.likeCount, 0)
    }

    @MainActor
    func testFriendRequestLifecycle() {
        let userA = User(name: "Alice", bio: "Hi", isCurrentUser: true)
        let userB = User(name: "Bob", bio: "Hey", isCurrentUser: false)
        context.insert(userA)
        context.insert(userB)

        // Send request
        let friendship = Friendship(fromUser: userA, toUser: userB, statusRaw: "pending")
        context.insert(friendship)
        try! context.save()
        XCTAssertEqual(friendship.statusRaw, "pending")
        XCTAssertEqual(userA.friendCount, 0)

        // Accept request
        friendship.statusRaw = "accepted"
        try! context.save()
        XCTAssertEqual(friendship.statusRaw, "accepted")
        XCTAssertEqual(userA.friendCount, 1)
        XCTAssertEqual(userB.friendCount, 1)

        // Unfriend (delete)
        context.delete(friendship)
        try! context.save()
        XCTAssertEqual(userA.friendCount, 0)
        XCTAssertEqual(userB.friendCount, 0)
    }

    @MainActor
    func testLikeUnlike() {
        let user = User(name: "Liker", bio: "Likes things", isCurrentUser: true)
        context.insert(user)
        let post = Post(text: "Likeable post", author: user)
        context.insert(post)
        try! context.save()
        XCTAssertEqual(post.likeCount, 0)

        // Like
        let like = Like(user: user, post: post)
        context.insert(like)
        try! context.save()
        XCTAssertEqual(post.likeCount, 1)

        // Unlike
        context.delete(like)
        try! context.save()
        XCTAssertEqual(post.likeCount, 0)
    }

    @MainActor
    func testFeedFiltering() {
        let me = User(name: "Me", bio: "Current", isCurrentUser: true)
        let friend = User(name: "Friend", bio: "Pal", isCurrentUser: false)
        let stranger = User(name: "Stranger", bio: "Unknown", isCurrentUser: false)
        context.insert(me)
        context.insert(friend)
        context.insert(stranger)

        // Make friend
        let friendship = Friendship(fromUser: me, toUser: friend, statusRaw: "accepted")
        context.insert(friendship)

        // Posts
        let myPost = Post(text: "My post", author: me)
        let friendPost = Post(text: "Friend post", author: friend)
        let strangerPost = Post(text: "Stranger post", author: stranger)
        context.insert(myPost)
        context.insert(friendPost)
        context.insert(strangerPost)
        try! context.save()

        // Simulate feed filtering
        let friendIDs = Set(me.friends.map { $0.persistentModelID })
        let descriptor = FetchDescriptor<Post>()
        let allPosts = try! context.fetch(descriptor)
        let feedPosts = allPosts.filter { post in
            guard let author = post.author else { return false }
            return author.persistentModelID == me.persistentModelID ||
                   friendIDs.contains(author.persistentModelID)
        }

        XCTAssertEqual(feedPosts.count, 2)
        let feedTexts = Set(feedPosts.map { $0.text })
        XCTAssertTrue(feedTexts.contains("My post"))
        XCTAssertTrue(feedTexts.contains("Friend post"))
        XCTAssertFalse(feedTexts.contains("Stranger post"))
    }
}
