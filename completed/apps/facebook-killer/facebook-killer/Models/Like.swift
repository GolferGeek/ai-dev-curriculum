import Foundation
import SwiftData

@Model
final class Like {
    var user: User?
    var post: Post?

    init(user: User? = nil, post: Post? = nil) {
        self.user = user
        self.post = post
    }
}
