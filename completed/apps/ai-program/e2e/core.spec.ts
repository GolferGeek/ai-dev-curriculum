import { expect, test } from "@playwright/test";

test("overview exposes all eight categories and blockers", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Your AI Program/ })).toBeVisible();
  await expect(page.locator(".category-card")).toHaveCount(8);
  await expect(page.getByText("Structure ready.")).toBeVisible();
  await expect(page.getByText("readiness blockers")).toBeVisible();
});

test("folder navigation renders README content and authority metadata", async ({ page }) => {
  await page.goto("/program/05-controls-and-assurance/01-control-catalog-and-ownership");
  await expect(page.getByRole("heading", { name: "Control catalog and ownership" })).toBeVisible();
  await expect(page.getByText("Folder-level company stance")).toBeVisible();
  await expect(page.getByText("Approved by")).toBeVisible();
  await expect(page.getByText("UNASSIGNED").first()).toBeVisible();
  await expect(page.locator(".markdown-body")).toContainText("inventory of controls");
});

test("advisor returns a qualified cited gap answer", async ({ page }) => {
  await page.goto("/ask");
  await page.getByRole("button", { name: "What are we lacking?" }).click();
  await expect(page.getByRole("heading", { name: /Ownership, approval, and operating evidence/ })).toBeVisible();
  await expect(page.getByText("Uncertainty", { exact: true })).toBeVisible();
  await expect(page.getByText("Next action", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Governing sources" })).toBeVisible();
  await expect(page.locator(".citation-block a").first()).toBeVisible();
});

test("advisor treats culture as governed and sentiment as bounded evidence", async ({ page }) => {
  await page.goto("/ask");
  await page.getByRole("button", { name: "How is our AI culture?" }).click();
  await expect(page.getByRole("heading", { name: /Culture is governed/ })).toBeVisible();
  await expect(page.locator(".answer-lead")).toContainText("silent employee monitoring");
  await expect(page.locator(".citation-block")).toContainText("Sentiment, listening, and privacy");
});

test("profile selector filters the program without changing its eight categories", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("AI Program profile")).toHaveValue("full");
  const fullFolderCount = Number(await page.locator(".metric-strip strong").nth(1).textContent());
  await page.getByLabel("AI Program profile").selectOption("light");
  await expect(page.getByLabel("AI Program profile")).toHaveValue("light");
  await expect(page.getByRole("heading", { name: "Light profile" })).toBeVisible();
  const lightFolderCount = Number(await page.locator(".metric-strip strong").nth(1).textContent());
  expect(lightFolderCount).toBeLessThan(fullFolderCount);
  await expect(page.locator(".category-card")).toHaveCount(8);
});

test("trace shows every stage and exposes missing approval", async ({ page }) => {
  await page.goto("/trace");
  await expect(page.locator(".trace-stage")).toHaveCount(9);
  await expect(page.getByText("Missing — deployment blocker")).toBeVisible();
  await expect(page.getByText("Not approved client policy or proof of compliance.")).toBeVisible();
});

test("proposal generation does not claim policy activation", async ({ page }) => {
  await page.goto("/proposals");
  await page.getByLabel("Proposed resolution").fill("Assign the CTO as approver after steering-group review.");
  await page.getByRole("button", { name: "Prepare reviewable Markdown" }).click();
  await expect(page.getByText("Proposed, not policy.")).toBeVisible();
  await expect(page.locator(".proposal-output pre")).toContainText("status: proposed");
  await expect(page.locator(".proposal-output pre")).toContainText("does not change policy");
});
