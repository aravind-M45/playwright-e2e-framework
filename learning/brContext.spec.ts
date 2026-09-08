
import {test,expect,Page,chromium} from "@playwright/test"

// Browser --> Context --> Page
// 1) Browser = can create our own browser
// 2) Context = create Context and handle multiple page and apps
// 3) Page    =  NEW TAB, WINDOW, POP-UPS 


test("Browser Context",async ()=>{

    const browser=await chromium.launch(); //create browser
    const context=await browser.newContext();
    

    const page1:Page=await context.newPage(); //create page-1
    await page1.goto("https://testautomationpractice.blogspot.com/");
    await expect(page1).toHaveTitle("Automation Testing Practice");

    const page2:Page=await context.newPage(); //create page-2
    await page2.goto("https://playwright.dev/docs/frames");
    await expect(page2).toHaveTitle("Frames | Playwright");

    console.log("No of Pages: ",context.pages().length );
    expect(context.pages().length).toBe(2)
    await page1.waitForTimeout(3000)
    await page2.waitForTimeout(3000)
})