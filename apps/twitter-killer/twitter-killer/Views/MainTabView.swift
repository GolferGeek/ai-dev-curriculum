import SwiftUI

struct MainTabView: View {
    var body: some View {
        TabView {
            NavigationStack {
                FeedView()
            }
            .tabItem {
                Label("Feed", systemImage: "list.bullet")
            }
            .accessibilityIdentifier("feed_tab")

            NavigationStack {
                ComposeView()
            }
            .tabItem {
                Label("Compose", systemImage: "square.and.pencil")
            }
            .accessibilityIdentifier("compose_tab")

            NavigationStack {
                ProfileView()
            }
            .tabItem {
                Label("Profile", systemImage: "person.circle")
            }
            .accessibilityIdentifier("profile_tab")
        }
        .accessibilityIdentifier("main_tab_view")
    }
}
