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

        // Keep both sides populated immediately, including on iOS 17 where
        // assigning a to-one relationship may not update its inverse array
        // until the context is refreshed.
        if let fromUser, !fromUser.sentRequests.contains(where: { $0 === self }) {
            fromUser.sentRequests.append(self)
        }
        if let toUser, !toUser.receivedRequests.contains(where: { $0 === self }) {
            toUser.receivedRequests.append(self)
        }
    }
}
