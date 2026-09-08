
import {test,expect,chromium} from "@playwright/test"

test("Authenticated Pop-ups",async()=>{

    const browser=await chromium.launch();
    const context=await browser.newContext({httpCredentials:{username:'admin',password:'admin'}}); //using context
    const page=await context.newPage();

    //Approach 1 -> Injecting the values to URL
    // https://admin:admin@the-internet.herokuapp.com/basic_auth
    //await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");

    //await page.waitForLoadState() //waits till the page fully loads


    // Approach 2 -> Using context passing values
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await expect(page.locator("p:has-text('Congratulations')")).toBeVisible();


    await page.waitForTimeout(3000);
})