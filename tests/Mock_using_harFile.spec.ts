
import {test,expect} from "@playwright/test"

test.use({
    screenshot:'on',
    browserName:'chromium'
})
test("Mocking Data using the HAR file",async ({page})=>{
    await page.routeFromHAR("./Har/fruits.har",{
        url:"*/**/api/v1/fruits",
        update:false
    })
    await page.goto("https://demo.playwright.dev/api-mocking/");
    await expect(page.getByText("Playwright with Typescript")).toBeVisible();
    await expect(page.getByText("Playwright API Testing")).toBeVisible();
    await expect(page.getByText("Playwright with Jenkins")).toBeVisible();
})