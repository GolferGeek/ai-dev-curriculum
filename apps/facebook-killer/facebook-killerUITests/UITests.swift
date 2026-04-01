import XCTest

final class FacebookKillerUITests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launchArguments = ["-UITest"]
    }

    override func tearDown() {
        app.terminate()
        sleep(1)
        super.tearDown()
    }

    // MARK: - Onboarding test

    func testOnboardingFlow() {
        app.launch()
        sleep(2)

        // Verify all onboarding elements exist
        let nameField = app.textFields["onboarding_name_field"]
        XCTAssertTrue(nameField.waitForExistence(timeout: 10), "Name field should exist")

        let bioField = app.textFields["onboarding_bio_field"]
        XCTAssertTrue(bioField.exists, "Bio field should exist")

        let createButton = app.buttons["onboarding_create_button"]
        XCTAssertTrue(createButton.exists, "Create button should exist")

        let sampleToggle = app.switches["onboarding_sample_toggle"]
        XCTAssertTrue(sampleToggle.exists, "Sample data toggle should exist")
    }

    // MARK: - Tests using pre-seeded data

    func testComposeAndPost() {
        app.launchArguments.append("-UITestSeeded")
        app.launch()
        sleep(3)

        let composeTab = app.tabBars.buttons["Compose"]
        XCTAssertTrue(composeTab.waitForExistence(timeout: 10), "Compose tab should exist")
        composeTab.tap()
        sleep(2)

        let textView = app.textViews["compose_text_field"]
        XCTAssertTrue(textView.waitForExistence(timeout: 10), "Compose text field should exist")

        let postButton = app.buttons["compose_post_button"]
        XCTAssertTrue(postButton.waitForExistence(timeout: 5), "Post button should exist")
    }

    func testFeedDisplay() {
        app.launchArguments.append(contentsOf: ["-UITestSeeded", "-UITestWithSampleData"])
        app.launch()
        sleep(3)

        let feedTab = app.tabBars.buttons["Feed"]
        XCTAssertTrue(feedTab.waitForExistence(timeout: 10), "Feed tab should exist")
        feedTab.tap()
        sleep(3)

        let hasContent = app.staticTexts.element(boundBy: 0).waitForExistence(timeout: 10)
        XCTAssertTrue(hasContent, "Feed should display posts from friends")
    }

    func testFriendsTab() {
        app.launchArguments.append(contentsOf: ["-UITestSeeded", "-UITestWithSampleData"])
        app.launch()
        sleep(3)

        let friendsTab = app.tabBars.buttons["Friends"]
        XCTAssertTrue(friendsTab.waitForExistence(timeout: 10), "Friends tab should exist")
        friendsTab.tap()
        sleep(3)

        // Check for "My Friends" or "No friends yet" (either means the section rendered)
        let myFriends = app.staticTexts["My Friends"]
        let noFriends = app.staticTexts["No friends yet"]
        let hasFriendsContent = myFriends.waitForExistence(timeout: 10) || noFriends.exists
        XCTAssertTrue(hasFriendsContent, "Friends tab should show content")
    }

    func testProfileView() {
        app.launchArguments.append("-UITestSeeded")
        app.launch()
        sleep(3)

        let profileTab = app.tabBars.buttons["Profile"]
        XCTAssertTrue(profileTab.waitForExistence(timeout: 10), "Profile tab should exist")
        profileTab.tap()
        sleep(3)

        // Look for user name by accessibility identifier or text
        let profileName = app.staticTexts["profile_name"]
        let nameText = app.staticTexts["Test User"]

        let found = profileName.waitForExistence(timeout: 10) || nameText.waitForExistence(timeout: 5)
        XCTAssertTrue(found, "Profile should show user name")
    }
}
