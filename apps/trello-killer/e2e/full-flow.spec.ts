import { test, expect } from "@playwright/test";

const uniqueEmail = () => `flow-${Date.now()}@example.com`;

test.describe("Full Flow", () => {
  test("signup -> create board -> add lists -> add cards -> move card -> signout -> signin -> verify persistence", async ({
    page,
  }) => {
    test.setTimeout(60000);
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
    await expect(page.locator("main h3").filter({ hasText: "Sprint Board" })).toBeVisible();

    // 3. Open the board
    await page.locator("main h3").filter({ hasText: "Sprint Board" }).click();
    await page.waitForURL(/\/boards\//);
    await expect(page.locator("h2")).toContainText("Sprint Board");

    // 4. Add lists — helper to add a list and wait for the redirect
    const addList = async (name: string) => {
      // If the form is still open from a previous add, click Cancel first
      const cancelBtn = page.locator('button:has-text("Cancel")');
      if (await cancelBtn.isVisible({ timeout: 500 }).catch(() => false)) {
        await cancelBtn.click();
      }
      await page.locator("text=Add another list").click();
      await page.fill('input[name="name"]', name);
      await page.locator('button:has-text("Add List")').click();
      // Wait for the list heading to appear (server action redirect reloads the page)
      await expect(page.locator(`h3:has-text("${name}")`)).toBeVisible({ timeout: 10000 });
    };

    await addList("To Do");
    await addList("In Progress");
    await addList("Done");

    // 5. Add a card to "To Do"
    const todoColumn = page.locator("div.shrink-0").filter({ has: page.locator('h3', { hasText: "To Do" }) });
    await todoColumn.locator("text=Add a card").click();
    await todoColumn.locator('textarea[name="title"]').fill("Write tests");
    await todoColumn.locator('button:has-text("Add Card")').click();
    await expect(page.locator("text=Write tests")).toBeVisible();

    // 6. Click card to open detail modal
    await page.locator("text=Write tests").first().click();
    await expect(page.locator("text=Card Details")).toBeVisible();

    // 7. Edit card description and move to "In Progress" in one save
    await page.fill('textarea[name="description"]', "Add Playwright e2e tests");
    await page.locator('select[name="listId"]').selectOption({ label: "In Progress" });
    await page.click('button:has-text("Save Changes")');

    // 8. Verify card still exists after save + move
    await expect(page.locator("text=Write tests")).toBeVisible();

    // 9. Close modal if still open (server action redirect preserves client state)
    const closeBtn = page.locator('button[aria-label="Close"]');
    if (await closeBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await closeBtn.click();
    }

    // 10. Sign out
    await page.click('button:has-text("Sign Out")');
    await expect(page).toHaveURL(/\/signin/);

    // 11. Sign back in
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/boards/);

    // 12. Verify persistence — board exists
    await expect(page.locator("main h3").filter({ hasText: "Sprint Board" })).toBeVisible();

    // Open the board and verify data
    await page.locator("main h3").filter({ hasText: "Sprint Board" }).click();
    await page.waitForURL(/\/boards\//);
    await expect(page.locator("h3", { hasText: "To Do" })).toBeVisible();
    await expect(page.locator("h3", { hasText: "In Progress" })).toBeVisible();
    await expect(page.locator("h3", { hasText: "Done" })).toBeVisible();
    await expect(page.locator("text=Write tests").first()).toBeVisible();
  });
});
