import { expect, test } from "@playwright/test";
test("catalog searches, filters, and opens exact capability evidence", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Know what an AI capability/ })).toBeVisible();
  const search = page.getByLabel("Search capabilities");
  await search.fill("security");
  await expect(page.getByText(/Showing \d+ of \d+/)).toBeVisible();
  await page.getByLabel("Filter by kind").selectOption("skill");
  const card = page.locator(".capability-card").first();
  await expect(card).toBeVisible();
  await card.click();
  await expect(page.getByText("Exact revision")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Complete folder" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy exact source" })).toBeVisible();
});

test("source, diff, and evaluation views preserve governance boundaries", async ({ page }) => {
  await page.goto("/sources");
  await expect(page.getByText("Generated compatibility snapshot; never an independent policy source.")).toBeVisible();
  await page.goto("/compare");
  await expect(page.getByText(/Training fixture/)).toBeVisible();
  await expect(page.getByRole("heading", { name: "Failed" })).toBeVisible();
  await page.goto("/evaluations");
  await expect(page.getByText("rejected", { exact: true })).toBeVisible();
  await expect(page.getByText(/No client owner or approval exists/)).toBeVisible();
});
