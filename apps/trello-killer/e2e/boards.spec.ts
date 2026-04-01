import { test, expect } from "@playwright/test";

const uniqueEmail = () => `board-${Date.now()}@example.com`;

test.describe("Boards", () => {
  test("can create a board and open it", async ({ page }) => {
    const email = uniqueEmail();

    // Sign up
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Board Tester");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "testpass123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/boards/);

    // Create a board
    await page.click('text=Create new board');
    await page.fill('input[name="name"]', "My Test Board");
    await page.click('button:has-text("Create")');

    // Board should appear
    await expect(page.locator("text=My Test Board")).toBeVisible();

    // Open the board
    await page.click("text=My Test Board");
    await expect(page.locator("h2")).toContainText("My Test Board");
  });
});
