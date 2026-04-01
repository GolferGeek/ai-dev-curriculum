import SwiftUI

struct ContentView: View {
    @AppStorage("currentUserHandle") private var currentUserHandle: String = ""

    var body: some View {
        if currentUserHandle.isEmpty {
            OnboardingView()
        } else {
            MainTabView()
        }
    }
}
