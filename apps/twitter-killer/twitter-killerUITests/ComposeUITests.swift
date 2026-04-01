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
        if !keyboard.waitForExistence(timeout: 5) {
            XCTFail("Keyboard did not appear after tapping text editor")
            return
        }

        textEditor.typeText("Hello from UI test")

        // Dismiss keyboard
        let navBar = app.navigationBars.firstMatch
        XCTAssertTrue(navBar.waitForExistence(timeout: 3), "Navigation bar should exist")
        navBar.tap()

        // Post
        let postButton = app.buttons["compose_post_button"]
        XCTAssertTrue(postButton.isEnabled, "Post button should be enabled after typing")
        postButton.tap()

        // Verify confirmation
        let confirmation = app.staticTexts["compose_confirmation"]
        XCTAssertTrue(confirmation.waitForExistence(timeout: 5), "Confirmation should appear")
    }
}
