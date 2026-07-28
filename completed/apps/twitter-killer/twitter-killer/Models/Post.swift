import Foundation
import SwiftData

@Model
final class Post {
    var text: String
    var timestamp: Date
    var author: User?

    init(text: String, author: User) {
        self.text = text
        self.timestamp = Date()
        self.author = author
    }
}
