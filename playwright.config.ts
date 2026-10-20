import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm run preview -- --host 0.0.0.0 --port 4321",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: !process.env.CI,
    env: { ASTRO_TELEMETRY_DISABLED: "1" },
  },
});
