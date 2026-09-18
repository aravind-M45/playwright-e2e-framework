
import {test,expect,chromium} from "@playwright/test"

test("Hard and Soft Assertions",async ()=>{

    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();

    //HardAssertions --> The exection will be terminated if one test fails.
    /*await page.goto("https://testautomationpractice.blogspot.com/");
    await expect(page).toHaveTitle('Automation Testing Practice');
    await expect(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    await expect(page.locator('h1')).toBeVisible();*/
    
    //SoftAssertions --> The exection will be continued even if one test fails. (.soft)
    await page.goto("https://testautomationpractice.blogspot.com/");
    await expect.soft(page).toHaveTitle('Automation Testing ',{timeout:3000});
    await expect.soft(page).toHaveURL('https://testautomationpractice.blogspot.com/');
    await expect.soft(page.locator('h1')).toBeVisible();

})