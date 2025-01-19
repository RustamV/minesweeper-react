import { test, expect } from "@playwright/test";

test("cell primary", async ({ page }) => {
    await page.goto("/iframe.html?id=example-cell--primary"); // путь к компоненту в Storybook
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot({
        path: "__tests__/cell-primary.png",
    });
    expect(screenshot).toMatchSnapshot("cell-primary.png"); // сравнение скриншота с эталоном
});

test("cell checked", async ({ page }) => {
    await page.goto("/iframe.html?id=example-cell--checked"); // путь к компоненту в Storybook
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot({
        path: "__tests__/cell-checked.png",
    });
    expect(screenshot).toMatchSnapshot("cell-checked.png"); // сравнение скриншота с эталоном
});

test("cell flag", async ({ page }) => {
    await page.goto("/iframe.html?id=example-cell--flag"); // путь к компоненту в Storybook
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot({
        path: "__tests__/cell-flag.png",
    });
    expect(screenshot).toMatchSnapshot("cell-flag.png"); // сравнение скриншота с эталоном
});
