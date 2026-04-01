import XCTest

final class ProfileUITests: XCTestCase {
    private var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--uitesting", "--seeded"]
        app.launch()
    }

    func testProfileDisplay() throws {
        // Navigate to Profile tab
        let profileTab = app.tabBars.buttons["Profile"]
        XCTAssertTrue(profileTab.waitForExistence(timeout: 5), "Profile tab should exist")
        profileTab.tap()

        // Verify profile info is displayed (seeded user: "Test User" / "testuser")
        let profileName = app.staticTexts["profile_name"]
        XCTAssertTrue(profileName.waitForExistence(timeout: 5), "Profile name should appear")
        XCTAssertEqual(profileName.label, "Test User")

        let profileHandle = app.staticTexts["profile_handle"]
        XCTAssertTrue(profileHandle.exists, "Profile handle should appear")
        XCTAssertEqual(profileHandle.label, "@testuser")

        // Verify the sign out button exists and is tappable
        let signOutButton = app.buttons["profile_sign_out_button"]
        XCTAssertTrue(signOutButton.waitForExistence(timeout: 5), "Sign out button should exist on profile")
        XCTAssertTrue(signOutButton.isHittable, "Sign out button should be tappable")
    }
}
