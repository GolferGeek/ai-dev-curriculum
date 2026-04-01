import { expect, test } from "@playwright/test";

test("search filters and page preview visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Team Wiki/i })).toBeVisible();
  await page.getByTestId("wiki-search").fill("runbook");
  await page.getByRole("button", { name: /Incident runbook/i }).click();
  await expect(page.getByTestId("md-preview")).toBeVisible();
});
