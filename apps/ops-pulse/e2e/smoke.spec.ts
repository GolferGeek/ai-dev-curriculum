import { expect, test } from "@playwright/test";

test("run checks updates tiles and add log entry", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("run-checks").click();
  await expect(page.getByTestId("check-c1")).toContainText(/ok|warn|fail/i);
  await page.getByTestId("log-input").fill("Investigating latency spike");
  await page.getByTestId("log-add").click();
  await expect(page.getByTestId("log-list")).toContainText("Investigating latency");
});
