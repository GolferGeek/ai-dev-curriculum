import XCTest

final class OnboardingUITests: XCTestCase {
    private var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--uitesting"]
        app.launch()
    }

    func testOnboardingFlow() throws {
        // Verify onboarding screen is shown on first launch
        let nameField = app.textFields["onboarding_name_field"]
        XCTAssertTrue(nameField.waitForExistence(timeout: 5), "Name field should appear on first launch")

        let handleField = app.textFields["onboarding_handle_field"]
        XCTAssertTrue(handleField.exists, "Handle field should exist")

        let getStartedButton = app.buttons["onboarding_get_started_button"]
        XCTAssertTrue(getStartedButton.exists, "Get Started button should exist")

        // Try to type into fields
        nameField.tap()
        let keyboard = app.keyboards.firstMatch
        if !keyboard.waitForExistence(timeout: 5) {
            XCTFail("Keyboard did not appear after tapping name field")
            return
        }

        nameField.typeText("Test User")
        handleField.tap()
        XCTAssertTrue(app.keyboards.firstMatch.waitForExistence(timeout: 3), "Keyboard should remain visible after tapping handle field")
        handleField.typeText("testuser")

        // Dismiss keyboard
        let titleText = app.staticTexts["Welcome to Chirp"]
        if titleText.exists {
            titleText.tap()
        }

        // Wait for keyboard to dismiss
        let keyboardDismissed = NSPredicate(format: "count == 0")
        expectation(for: keyboardDismissed, evaluatedWith: app.keyboards)
        waitForExpectations(timeout: 5)

        // Complete onboarding
        XCTAssertTrue(getStartedButton.waitForExistence(timeout: 3), "Get Started button should be available")
        XCTAssertTrue(getStartedButton.isEnabled, "Get Started button should be enabled after filling fields")
        getStartedButton.tap()

        let tabBar = app.tabBars.firstMatch
        XCTAssertTrue(tabBar.waitForExistence(timeout: 10), "Tab bar should appear after onboarding")
    }

    func testOnboardingScreenStructure() throws {
        // Verify all onboarding elements exist
        let title = app.staticTexts["Welcome to Chirp"]
        XCTAssertTrue(title.waitForExistence(timeout: 5), "Welcome title should appear")

        let subtitle = app.staticTexts["Create your profile to get started"]
        XCTAssertTrue(subtitle.exists, "Subtitle should appear")

        let nameField = app.textFields["onboarding_name_field"]
        XCTAssertTrue(nameField.exists, "Name field should exist")

        let handleField = app.textFields["onboarding_handle_field"]
        XCTAssertTrue(handleField.exists, "Handle field should exist")

        let getStartedButton = app.buttons["onboarding_get_started_button"]
        XCTAssertTrue(getStartedButton.exists, "Get Started button should exist")
    }
}
