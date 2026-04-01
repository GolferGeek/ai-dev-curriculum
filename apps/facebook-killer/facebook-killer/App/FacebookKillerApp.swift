import SwiftUI
import SwiftData

@main
struct FacebookKillerApp: App {
    let modelContainer: ModelContainer
    let isSeeded: Bool

    init() {
        let schema = Schema([User.self, Post.self, Friendship.self, Like.self])
        let isUITest = CommandLine.arguments.contains("-UITest")
        let config: ModelConfiguration
        if isUITest {
            config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: true)
        } else {
            config = ModelConfiguration(schema: schema)
        }
        do {
            modelContainer = try ModelContainer(for: schema, configurations: [config])
        } catch {
            fatalError("Failed to create ModelContainer: \(error)")
        }

        isSeeded = CommandLine.arguments.contains("-UITestSeeded")
    }

    var body: some Scene {
        WindowGroup {
            ContentView(shouldSeed: isSeeded)
        }
        .modelContainer(modelContainer)
    }
}

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(filter: #Predicate<User> { $0.isCurrentUser == true }) private var currentUsers: [User]
    let shouldSeed: Bool
    @State private var seeded = false

    var body: some View {
        Group {
            if currentUsers.isEmpty && !seeded {
                if shouldSeed {
                    ProgressView("Loading...")
                        .task {
                            await seedData()
                        }
                } else {
                    OnboardingView()
                }
            } else {
                MainTabView()
            }
        }
    }

    @MainActor
    private func seedData() async {
        let user = User(name: "Test User", bio: "Test bio here", isCurrentUser: true)
        modelContext.insert(user)
        try? modelContext.save()

        if CommandLine.arguments.contains("-UITestWithSampleData") {
            SampleData.seed(in: modelContext)
        }
        seeded = true
    }
}
