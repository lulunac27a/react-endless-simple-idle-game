const { test, expect } = require("@playwright/test");

const PRIMARY_COLORS = [
    { name: "Red", rgb: "rgb(255, 0, 0)" },
    { name: "Green", rgb: "rgb(0, 255, 0)" },
    { name: "Blue", rgb: "rgb(0, 0, 255)" },
    { name: "Yellow", rgb: "rgb(255, 255, 0)" },
];

test("loads the app without browser console errors", async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");
    await expect(
        page.getByRole("heading", { name: "Primary Colors Landing Page" }),
    ).toBeVisible();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
});

test("initial page shows the four primary colors", async ({ page }) => {
    await page.goto("/");

    for (const { name, rgb } of PRIMARY_COLORS) {
        await expect(page.getByText(name, { exact: true })).toBeVisible();
        await expect(
            page.getByRole("img", { name: `${name} color swatch` }),
        ).toHaveCSS("background-color", rgb);
    }
});

test("navigates between the colors page and the idle game", async ({
    page,
}) => {
    await page.goto("/");

    await page.getByRole("button", { name: "Go to Idle Game" }).click();
    await expect(page.getByText("Endless Simple Idle Game")).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Primary Colors Landing Page" }),
    ).toHaveCount(0);

    await page
        .getByRole("button", { name: /Back to Primary Colors Landing Page/ })
        .click();
    await expect(
        page.getByRole("heading", { name: "Primary Colors Landing Page" }),
    ).toBeVisible();
    await expect(page.getByText("Endless Simple Idle Game")).toHaveCount(0);
});
