import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./src",
    use: {
        baseURL: "http://localhost:6006", // Адрес локального Storybook
        browserName: "chromium", // Или 'firefox', 'webkit'
        screenshot: "on",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
