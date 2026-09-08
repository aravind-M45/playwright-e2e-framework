
import {test,expect,chromium} from "@playwright/test"


test.beforeEach('',async ({page})=>{
    /*const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();*/
    await page.goto('https://demo.nopcommerce.com/');
})
test("Verify Logo",async({page})=>{
    const logo=page.locator(".header-logo a");
    await expect(logo).toBeVisible();
})
test("Verify Page Title",async({page})=>{
    await expect(page).toHaveTitle("nopCommerce demo store. Home page ");
})
test("Verify page URL",async({page})=>{
    await expect(page).toHaveURL("https://demo.nopcommerce.com/");
})  