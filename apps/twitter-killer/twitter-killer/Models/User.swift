import Foundation
import SwiftData

@Model
final class User {
    var name: String
    var handle: String
    var bio: String
    @Attribute(.externalStorage) var avatarData: Data?
    var createdAt: Date

    @Relationship(deleteRule: .cascade, inverse: \Post.author)
    var posts: [Post]

    init(name: String, handle: String, bio: String = "", avatarData: Data? = nil) {
        self.name = name
        self.handle = handle
        self.bio = bio
        self.avatarData = avatarData
        self.createdAt = Date()
        self.posts = []
    }
}
