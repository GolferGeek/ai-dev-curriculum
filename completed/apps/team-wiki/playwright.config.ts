import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: "./e2e",
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://localhost:4174",
  },
  webServer: {
    command: "npm run preview",
    url: "http://localhost:4174",
    reuseExistingServer: !process.env.CI,
    cwd: root,
  },
});
