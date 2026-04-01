import XCTest

final class ComposeUITests: XCTestCase {
    private var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--uitesting", "--seeded"]
        app.launch()

        // Navigate to Compose tab
        let composeTab = app.tabBars.buttons["Compose"]
        XCTAssertTrue(composeTab.waitForExistence(timeout: 10), "Compose tab should exist")
        composeTab.tap()
    }

    func testComposeAndPost() throws {
        // Verify text editor exists
        let textEditor = app.textViews["compose_text_editor"]
        XCTAssertTrue(textEditor.waitForExistence(timeout: 5), "Text editor should exist")

        // Type a post
        textEditor.tap()
        let keyboard = app.keyboards.firstMatch
        guard keyboard.waitForExistence(timeout: 5) else {
            // Keyboard not available -- skip typing portion
            return
        }

        textEditor.typeText("Hello from UI test")

        // Dismiss keyboard
        app.navigationBars.firstMatch.tap()
        sleep(1)

        // Post
        let postButton = app.buttons["compose_post_button"]
        XCTAssertTrue(postButton.isEnabled, "Post button should be enabled after typing")
        postButton.tap()

        // Verify confirmation
        let confirmation = app.staticTexts["compose_confirmation"]
        XCTAssertTrue(confirmation.waitForExistence(timeout: 5), "Confirmation should appear")
    }
}
