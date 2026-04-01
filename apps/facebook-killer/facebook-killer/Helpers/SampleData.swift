import Foundation
import SwiftData

struct SampleData {
    @MainActor
    static func seed(in context: ModelContext) {
        // Create sample users
        let alice = User(name: "Alice Johnson", bio: "Loves hiking and photography", isCurrentUser: false)
        let bob = User(name: "Bob Smith", bio: "Coffee enthusiast and coder", isCurrentUser: false)
        let carol = User(name: "Carol Davis", bio: "Bookworm and cat lover", isCurrentUser: false)
        let dave = User(name: "Dave Wilson", bio: "Musician and foodie", isCurrentUser: false)

        context.insert(alice)
        context.insert(bob)
        context.insert(carol)
        context.insert(dave)

        // Fetch current user
        let descriptor = FetchDescriptor<User>(predicate: #Predicate { $0.isCurrentUser == true })
        guard let currentUser = try? context.fetch(descriptor).first else { return }

        // Create friendships: current user is friends with Alice and Bob
        let f1 = Friendship(fromUser: currentUser, toUser: alice, statusRaw: "accepted")
        let f2 = Friendship(fromUser: bob, toUser: currentUser, statusRaw: "accepted")
        // Carol sent a pending request to current user
        let f3 = Friendship(fromUser: carol, toUser: currentUser, statusRaw: "pending")

        context.insert(f1)
        context.insert(f2)
        context.insert(f3)

        // Create posts
        let now = Date()
        let posts: [(User, String, TimeInterval)] = [
            (alice, "Just got back from an amazing hike in the mountains! The views were incredible.", -3600),
            (bob, "Found the perfect pour-over ratio today. Life is good.", -7200),
            (currentUser, "Excited to try this new private social network!", -1800),
            (alice, "My cat decided my keyboard is the best bed in the house.", -14400),
            (bob, "Shipping code and sipping coffee -- the perfect morning.", -28800),
            (carol, "Just finished reading a great novel. Highly recommend!", -5400),
            (dave, "New song in progress. Can't wait to share it!", -10800),
        ]

        for (author, text, offset) in posts {
            let post = Post(text: text, timestamp: now.addingTimeInterval(offset), author: author)
            context.insert(post)
        }

        try? context.save()
    }
}
