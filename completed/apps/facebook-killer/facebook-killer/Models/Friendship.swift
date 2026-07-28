import Foundation
import SwiftData

@Model
final class Friendship {
    var fromUser: User?
    var toUser: User?
    var statusRaw: String

    init(fromUser: User? = nil, toUser: User? = nil, statusRaw: String = "pending") {
        self.fromUser = fromUser
        self.toUser = toUser
        self.statusRaw = statusRaw
    }
}
