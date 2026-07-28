import { expect, test } from "@playwright/test";

test("send request shows response status and body", async ({ page }) => {
  await page.route("https://httpbin.org/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, source: "playwright-fixture" }),
    });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /HTTP Workspace/i })).toBeVisible();
  await page.getByTestId("send-btn").click();
  await expect(page.getByTestId("resp-status")).toContainText("200");
  await expect(page.getByTestId("resp-body")).toContainText("playwright-fixture");
});
