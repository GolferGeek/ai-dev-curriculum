import Foundation
import SwiftData

@Model
final class User {
    var name: String
    var bio: String
    @Attribute(.externalStorage) var avatarData: Data?
    var isCurrentUser: Bool

    @Relationship(deleteRule: .cascade, inverse: \Post.author)
    var posts: [Post] = []

    @Relationship(deleteRule: .cascade, inverse: \Friendship.fromUser)
    var sentRequests: [Friendship] = []

    @Relationship(deleteRule: .cascade, inverse: \Friendship.toUser)
    var receivedRequests: [Friendship] = []

    @Relationship(deleteRule: .cascade, inverse: \Like.user)
    var likes: [Like] = []

    init(name: String, bio: String, avatarData: Data? = nil, isCurrentUser: Bool = false) {
        self.name = name
        self.bio = bio
        self.avatarData = avatarData
        self.isCurrentUser = isCurrentUser
    }

    var friendCount: Int {
        let acceptedSent = sentRequests.filter { $0.statusRaw == "accepted" }.count
        let acceptedReceived = receivedRequests.filter { $0.statusRaw == "accepted" }.count
        return acceptedSent + acceptedReceived
    }

    var friends: [User] {
        let fromSent = sentRequests.filter { $0.statusRaw == "accepted" }.compactMap { $0.toUser }
        let fromReceived = receivedRequests.filter { $0.statusRaw == "accepted" }.compactMap { $0.fromUser }
        return fromSent + fromReceived
    }
}
