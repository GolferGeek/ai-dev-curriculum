import SwiftUI

struct MainTabView: View {
    var body: some View {
        TabView {
            FeedView()
                .tabItem {
                    Label("Feed", systemImage: "house.fill")
                }
                .accessibilityIdentifier("tab_feed")

            ComposeView()
                .tabItem {
                    Label("Compose", systemImage: "plus.circle.fill")
                }
                .accessibilityIdentifier("tab_compose")

            FriendsView()
                .tabItem {
                    Label("Friends", systemImage: "person.2.fill")
                }
                .accessibilityIdentifier("tab_friends")

            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person.fill")
                }
                .accessibilityIdentifier("tab_profile")
        }
        .accessibilityIdentifier("main_tab_view")
    }
}
