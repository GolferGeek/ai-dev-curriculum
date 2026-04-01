import { expect, test } from "@playwright/test";

test("add note on deal", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("deal-d1").click();
  await page.getByTestId("note-input").fill("Called prospect — interested");
  await page.getByTestId("note-add").click();
  await expect(page.getByTestId("notes-list")).toContainText("Called prospect");
});
