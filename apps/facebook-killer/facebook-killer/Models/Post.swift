import Foundation
import SwiftData

@Model
final class Post {
    var text: String
    @Attribute(.externalStorage) var photoData: Data?
    var timestamp: Date
    var author: User?

    @Relationship(deleteRule: .cascade, inverse: \Like.post)
    var likes: [Like] = []

    init(text: String, photoData: Data? = nil, timestamp: Date = .now, author: User? = nil) {
        self.text = text
        self.photoData = photoData
        self.timestamp = timestamp
        self.author = author
    }

    var likeCount: Int {
        likes.count
    }
}
