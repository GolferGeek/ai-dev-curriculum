import XCTest

final class FeedUITests: XCTestCase {
    private var app: XCUIApplication!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["--uitesting", "--seeded"]
        app.launch()
    }

    func testFeedDisplay() throws {
        // Should land on main tab view with seeded data
        let feedTab = app.tabBars.buttons["Feed"]
        XCTAssertTrue(feedTab.waitForExistence(timeout: 5), "Feed tab should exist")
        feedTab.tap()

        // The seeded user has their own post "Seeded post one"
        // which should appear in the feed (own posts always show)
        let postText = app.staticTexts["Seeded post one"]
        XCTAssertTrue(postText.waitForExistence(timeout: 10), "Seeded post should appear in feed")
    }
}
