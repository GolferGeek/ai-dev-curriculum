import { test, expect } from "@playwright/test";

const uniqueEmail = () => `inv-${Date.now()}@example.com`;

test.describe("Invoices", () => {
  test("create invoice, view in list, open detail, mark as paid", async ({
    page,
  }) => {
    // Sign up first
    const email = uniqueEmail();
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Invoice Tester");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "testpass123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);

    // Navigate to create invoice
    await page.click('a[href="/invoices"]');
    await page.click('a[href="/invoices/new"]');

    // Fill invoice form
    await page.fill('input[name="client"]', "Acme Test Corp");
    await page.fill('input[name="due_date"]', "2026-05-01");

    // First line item — use clear + type to trigger React onChange
    const descInput = page.locator('input[name="li_description"]').first();
    const amtInput = page.locator('input[name="li_amount"]').first();
    await descInput.clear();
    await descInput.pressSequentially("Web Development");
    await amtInput.clear();
    await amtInput.pressSequentially("1500");

    // Add second line item
    await page.locator('button', { hasText: '+ Add Item' }).click();
    await expect(page.locator('input[name="li_description"]')).toHaveCount(2, { timeout: 10000 });
    const descInput2 = page.locator('input[name="li_description"]').nth(1);
    const amtInput2 = page.locator('input[name="li_amount"]').nth(1);
    await descInput2.pressSequentially("Design Work");
    await amtInput2.pressSequentially("500");

    // Submit
    await page.click('button:has-text("Create Invoice")');
    await expect(page).toHaveURL(/\/invoices/);

    // Verify in list
    await expect(page.locator("text=Acme Test Corp")).toBeVisible();
    await expect(page.locator("text=$2000.00")).toBeVisible();
    await expect(page.locator("text=unpaid")).toBeVisible();

    // Open detail
    await page.click("text=View");
    await expect(page.locator("text=Web Development")).toBeVisible();
    await expect(page.locator("text=Design Work")).toBeVisible();
    await expect(page.locator("text=$2000.00")).toBeVisible();

    // Mark as paid
    await page.click('button:has-text("Mark as Paid")');
    // Wait for status badge to change from unpaid to paid (green badge)
    await expect(page.locator(".bg-green-100")).toBeVisible({ timeout: 10000 });
  });
});
