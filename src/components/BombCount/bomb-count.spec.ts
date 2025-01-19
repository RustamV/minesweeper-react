import { test, expect } from "@playwright/test";

test("компонент загружается корректно", async ({ page }) => {
    await page.goto("/iframe.html?id=example-bombcount--primary"); // путь к компоненту в Storybook
    await page.waitForTimeout(1000);
    const screenshot = await page.screenshot({
        path: "__tests__/bomb-count-primary.png",
    });
    expect(screenshot).toMatchSnapshot("bomb-count-primary.png"); // сравнение скриншота с эталоном
});
