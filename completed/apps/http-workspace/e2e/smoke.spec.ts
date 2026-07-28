import { expect, test } from "@playwright/test";

test("send request shows response status and body", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /HTTP Workspace/i })).toBeVisible();
  await page.getByTestId("send-btn").click();
  await expect(page.getByTestId("resp-status")).toContainText(/\d{3}/);
  await expect(page.getByTestId("resp-body")).not.toBeEmpty();
});
