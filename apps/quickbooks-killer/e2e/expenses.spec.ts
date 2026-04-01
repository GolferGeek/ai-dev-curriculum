import { test, expect } from "@playwright/test";

const uniqueEmail = () => `exp-${Date.now()}@example.com`;

test.describe("Expenses", () => {
  test("create expenses, verify list and running total", async ({ page }) => {
    // Sign up
    const email = uniqueEmail();
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Expense Tester");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "testpass123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);

    // Create first expense
    await page.click('a[href="/expenses"]');
    await page.click('a[href="/expenses/new"]');
    await page.fill('input[name="description"]', "Office Supplies");
    await page.fill('input[name="amount"]', "50");
    await page.selectOption('select[name="category"]', "Office");
    await page.fill('input[name="date"]', "2026-03-15");
    await page.click('button:has-text("Add Expense")');
    await expect(page).toHaveURL(/\/expenses/);

    // Create second expense
    await page.click('a[href="/expenses/new"]');
    await page.fill('input[name="description"]', "Train Ticket");
    await page.fill('input[name="amount"]', "35");
    await page.selectOption('select[name="category"]', "Travel");
    await page.fill('input[name="date"]', "2026-03-20");
    await page.click('button:has-text("Add Expense")');
    await expect(page).toHaveURL(/\/expenses/);

    // Verify both expenses in list
    await expect(page.locator("text=Office Supplies")).toBeVisible();
    await expect(page.locator("text=Train Ticket")).toBeVisible();

    // Verify running total exists (total should be $85.00)
    await expect(page.locator("text=Total: $85.00")).toBeVisible();
  });
});
