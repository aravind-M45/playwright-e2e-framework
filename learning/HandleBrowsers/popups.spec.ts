
import {test,expect,chromium} from "@playwright/test"

test("New Tab-popups",async ()=>{

    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    //await page.waitForEvent('popup')
    //await page.locator("#PopUp").click();

    await Promise.all([page.waitForEvent('popup'),page.locator("#PopUp").click()]);
    
    const allpop= context.pages();
    console.log("Total pop-up windows : ",allpop[0].url())
    console.log("Total pop-up windows : ",allpop[1].url())
    

    for(let pw of allpop)
    {
        const winTitle=await pw.title()
        console.log(winTitle);

        if(winTitle.includes('Selenium'))
        {
            await pw.locator('a[href="/documentation/webdriver/"]').click();
            console.log("Navigated to Selenium web page")
            
        }
    }
    await page.waitForTimeout(4000)
})