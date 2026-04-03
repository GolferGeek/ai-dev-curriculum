import SwiftUI
import SwiftData

@main
struct TwitterKillerApp: App {
    let modelContainer: ModelContainer

    init() {
        let schema = Schema([User.self, Post.self, Follow.self])
        let isUITesting = CommandLine.arguments.contains("--uitesting")
        let isSeeded = CommandLine.arguments.contains("--seeded")

        if isUITesting {
            // Clear all user defaults
            if let bundleId = Bundle.main.bundleIdentifier {
                UserDefaults.standard.removePersistentDomain(forName: bundleId)
            }
            // Also explicitly remove the key we use
            UserDefaults.standard.removeObject(forKey: "currentUserHandle")
            UserDefaults.standard.synchronize()

            let config = ModelConfiguration(isStoredInMemoryOnly: true)
            do {
                modelContainer = try ModelContainer(for: schema, configurations: [config])
            } catch {
                fatalError("Failed to create in-memory ModelContainer: \(error)")
            }

            if isSeeded {
                let context = modelContainer.mainContext
                let user = User(name: "Test User", handle: "testuser")
                context.insert(user)

                let post = Post(text: "Seeded post one", author: user)
                context.insert(post)

                let otherUser = User(name: "Other User", handle: "otheruser")
                context.insert(otherUser)

                let otherPost = Post(text: "Other user post", author: otherUser)
                context.insert(otherPost)

                try? context.save()

                UserDefaults.standard.set("testuser", forKey: "currentUserHandle")
                UserDefaults.standard.synchronize()
            }
        } else {
            do {
                modelContainer = try ModelContainer(for: schema)
            } catch {
                fatalError("Failed to create ModelContainer: \(error)")
            }
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(modelContainer)
    }
}
