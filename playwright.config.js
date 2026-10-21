const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./e2e",
    reporter: "list",
    use: {
        baseURL: "http://localhost:3000",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
    webServer: {
        command: "npm start",
        url: "http://localhost:3000",
        env: { BROWSER: "none" },
        reuseExistingServer: !process.env.CI,
        timeout: 120000,
    },
});
