import { test, expect } from "@playwright/test";

const uniqueEmail = () => `test-${Date.now()}@example.com`;

test.describe("Auth", () => {
  test("redirects unauthenticated users to signin", async ({ page }) => {
    await page.goto("/boards");
    await expect(page).toHaveURL(/\/signin/);
  });

  test("can sign up, view boards, sign out, and sign back in", async ({
    page,
  }) => {
    const email = uniqueEmail();
    const password = "testpass123";

    // Sign up
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Should land on boards page
    await expect(page).toHaveURL(/\/boards/);
    await expect(page.locator("h2")).toContainText("Your Boards");

    // Sign out
    await page.click('button:has-text("Sign Out")');
    await expect(page).toHaveURL(/\/signin/);

    // Sign back in
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/boards/);
  });
});
