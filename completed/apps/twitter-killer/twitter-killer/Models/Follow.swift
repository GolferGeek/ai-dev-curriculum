import Foundation
import SwiftData

@Model
final class Follow {
    var follower: User?
    var followed: User?
    var createdAt: Date

    init(follower: User, followed: User) {
        self.follower = follower
        self.followed = followed
        self.createdAt = Date()
    }
}
