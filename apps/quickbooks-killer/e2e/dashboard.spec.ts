import { test, expect } from "@playwright/test";

const uniqueEmail = () => `dash-${Date.now()}@example.com`;

test.describe("Dashboard", () => {
  test("shows correct totals after creating invoices and expenses", async ({
    page,
  }) => {
    // Sign up
    const email = uniqueEmail();
    await page.goto("/signup");
    await page.fill('input[name="name"]', "Dashboard Tester");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', "testpass123");
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/\/dashboard/);

    // Dashboard should show zeros initially
    await expect(page.locator("text=Outstanding Invoices")).toBeVisible();
    await expect(page.locator("text=Net Profit / Loss")).toBeVisible();

    // Create an invoice
    await page.click('a[href="/invoices"]');
    await page.click('a[href="/invoices/new"]');
    await page.fill('input[name="client"]', "Dashboard Client");
    await page.fill('input[name="due_date"]', "2026-06-01");
    await page.fill('input[name="li_description"]', "Consulting");
    await page.fill('input[name="li_amount"]', "1000");
    await page.click('button:has-text("Create Invoice")');
    await expect(page).toHaveURL(/\/invoices/);

    // Mark it as paid
    await page.click("text=View");
    await page.click('button:has-text("Mark as Paid")');
    await expect(page.locator(".bg-green-100")).toBeVisible({ timeout: 10000 });

    // Create an expense
    await page.click('a[href="/expenses"]');
    await page.click('a[href="/expenses/new"]');
    await page.fill('input[name="description"]', "Software License");
    await page.fill('input[name="amount"]', "200");
    await page.selectOption('select[name="category"]', "Software");
    await page.fill('input[name="date"]', "2026-03-01");
    await page.click('button:has-text("Add Expense")');

    // Go to dashboard and verify
    await page.click('a[href="/dashboard"]');
    await expect(page.locator("text=Total Income")).toBeVisible();
    await expect(
      page.locator("text=Total Income").locator("..").locator("text=$1,000.00")
    ).toBeVisible();
    await expect(
      page.locator("text=Total Expenses").locator("..").locator("text=$200.00")
    ).toBeVisible();
    await expect(page.locator("text=Net Profit / Loss")).toBeVisible();
  });
});
