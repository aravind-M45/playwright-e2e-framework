
import {test,expect,chromium} from "@playwright/test"

test("Handle Tabs",async ()=>{

    const browser=await chromium.launch();
    const context=await browser.newContext();
    const parentPage=await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //The following 2 statements should execute parallely
    //await context.waitForEvent('page')  //Must trigger the page event before action
    //await parentPage.locator("button:has-text('New Tab')").click();

    const childPage=await Promise.all([context.waitForEvent('page'),parentPage.locator("button:has-text('New Tab')").click()])
    let pages=context.pages();
    console.log(pages.length);
    expect(pages).toHaveLength(2);

    console.log(await pages[0].title())
    console.log(await pages[1].title())

    const heading=await pages[1].locator(".description span").innerText();
    console.log(heading);

})