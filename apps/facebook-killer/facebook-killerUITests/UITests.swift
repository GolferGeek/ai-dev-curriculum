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
        super.tearDown()
    }

    // MARK: - Onboarding test

    func testOnboardingFlow() {
        app.launch()

        // Verify all onboarding elements exist
        let nameField = app.textFields["onboarding_name_field"]
        XCTAssertTrue(nameField.waitForExistence(timeout: 12), "Name field should exist")

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

        let composeTab = app.tabBars.buttons["Compose"]
        XCTAssertTrue(composeTab.waitForExistence(timeout: 13), "Compose tab should exist")
        composeTab.tap()

        let textView = app.textViews["compose_text_field"]
        XCTAssertTrue(textView.waitForExistence(timeout: 12), "Compose text field should exist")

        // Actually type a post
        textView.tap()
        let keyboard = app.keyboards.firstMatch
        if !keyboard.waitForExistence(timeout: 5) {
            XCTFail("Keyboard did not appear after tapping compose text field")
            return
        }
        textView.typeText("Hello from UI test!")

        let postButton = app.buttons["compose_post_button"]
        XCTAssertTrue(postButton.waitForExistence(timeout: 5), "Post button should exist")
        postButton.tap()

        // Verify we navigate to feed and the new post appears
        let feedTab = app.tabBars.buttons["Feed"]
        XCTAssertTrue(feedTab.waitForExistence(timeout: 5), "Feed tab should exist after posting")
        feedTab.tap()

        let newPost = app.staticTexts["Hello from UI test!"]
        XCTAssertTrue(newPost.waitForExistence(timeout: 10), "Newly composed post should appear in feed")
    }

    func testFeedDisplay() {
        app.launchArguments.append(contentsOf: ["-UITestSeeded", "-UITestWithSampleData"])
        app.launch()

        let feedTab = app.tabBars.buttons["Feed"]
        XCTAssertTrue(feedTab.waitForExistence(timeout: 13), "Feed tab should exist")
        feedTab.tap()

        // Check for specific seeded post content from SampleData.swift (Alice's post)
        let alicePost = app.staticTexts["Just got back from an amazing hike in the mountains! The views were incredible."]
        XCTAssertTrue(alicePost.waitForExistence(timeout: 13), "Alice's seeded post should appear in feed")

        // Also verify another seeded post is present (Bob's post)
        let bobPost = app.staticTexts["Found the perfect pour-over ratio today. Life is good."]
        XCTAssertTrue(bobPost.waitForExistence(timeout: 5), "Bob's seeded post should appear in feed")
    }

    func testFriendsTab() {
        app.launchArguments.append(contentsOf: ["-UITestSeeded", "-UITestWithSampleData"])
        app.launch()

        let friendsTab = app.tabBars.buttons["Friends"]
        XCTAssertTrue(friendsTab.waitForExistence(timeout: 13), "Friends tab should exist")
        friendsTab.tap()

        // Check for "My Friends" or "No friends yet" (either means the section rendered)
        let myFriends = app.staticTexts["My Friends"]
        let noFriends = app.staticTexts["No friends yet"]
        let hasFriendsContent = myFriends.waitForExistence(timeout: 13) || noFriends.exists
        XCTAssertTrue(hasFriendsContent, "Friends tab should show content")
    }

    func testProfileView() {
        app.launchArguments.append("-UITestSeeded")
        app.launch()

        let profileTab = app.tabBars.buttons["Profile"]
        XCTAssertTrue(profileTab.waitForExistence(timeout: 13), "Profile tab should exist")
        profileTab.tap()

        // Look for user name by accessibility identifier or text
        let profileName = app.staticTexts["profile_name"]
        let nameText = app.staticTexts["Test User"]

        let found = profileName.waitForExistence(timeout: 13) || nameText.waitForExistence(timeout: 5)
        XCTAssertTrue(found, "Profile should show user name")
    }
}
