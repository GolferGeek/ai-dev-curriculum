import { test, expect } from "@playwright/test";

const uniqueEmail = () => `flow-${Date.now()}@example.com`;

test.describe("Full Flow", () => {
  test("signup -> create board -> add lists -> add cards -> move card -> signout -> signin -> verify persistence", async ({
    page,
  }) => {
    const email = uniqueEmail();
    const password = "testpass123";

    // 1. Sign up
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Flow Tester");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/boards/);

    // 2. Create a board
    await page.click("text=Create new board");
    await page.fill('input[name="name"]', "Sprint Board");
    await page.click('button:has-text("Create")');
    await expect(page.locator("text=Sprint Board")).toBeVisible();

    // 3. Open the board
    await page.click("text=Sprint Board");
    await expect(page.locator("h2")).toContainText("Sprint Board");

    // 4. Add lists
    await page.click("text=Add another list");
    await page.fill('input[name="name"]', "To Do");
    await page.click('button:has-text("Add List")');
    await expect(page.locator("text=To Do")).toBeVisible();

    await page.click("text=Add another list");
    await page.fill('input[name="name"]', "In Progress");
    await page.click('button:has-text("Add List")');
    await expect(page.locator("text=In Progress")).toBeVisible();

    await page.click("text=Add another list");
    await page.fill('input[name="name"]', "Done");
    await page.click('button:has-text("Add List")');
    await expect(page.locator("text=Done")).toBeVisible();

    // 5. Add a card to "To Do"
    const todoColumn = page.locator("div").filter({ hasText: /^To Do$/ }).first().locator("..").locator("..");
    await todoColumn.locator("text=Add a card").click();
    await todoColumn.locator('textarea[name="title"]').fill("Write tests");
    await todoColumn.locator('button:has-text("Add Card")').click();
    await expect(page.locator("text=Write tests")).toBeVisible();

    // 6. Click card to open detail modal
    await page.locator("text=Write tests").first().click();
    await expect(page.locator("text=Card Details")).toBeVisible();

    // 7. Edit card description
    await page.fill('textarea[name="description"]', "Add Playwright e2e tests");
    await page.click('button:has-text("Save Changes")');

    // 8. Move card via dropdown
    // After redirect, find the card's move-to dropdown
    const cardMoveSelect = page.locator("text=Write tests").first().locator("..").locator('select[name="newListId"]');
    await cardMoveSelect.selectOption({ label: "In Progress" });

    // 9. Verify card is now in "In Progress" column
    await expect(page.locator("text=Write tests")).toBeVisible();

    // 10. Sign out
    await page.click('button:has-text("Sign Out")');
    await expect(page).toHaveURL(/\/signin/);

    // 11. Sign back in
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/boards/);

    // 12. Verify persistence — board exists
    await expect(page.locator("text=Sprint Board")).toBeVisible();

    // Open the board and verify data
    await page.click("text=Sprint Board");
    await expect(page.locator("text=To Do")).toBeVisible();
    await expect(page.locator("text=In Progress")).toBeVisible();
    await expect(page.locator("text=Done")).toBeVisible();
    await expect(page.locator("text=Write tests")).toBeVisible();
  });
});
