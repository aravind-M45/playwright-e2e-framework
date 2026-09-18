
import {test,expect,Locator} from "@playwright/test"

test("Verify Sorted DD",async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/")
    let allOptions:Locator=page.locator("#colors>option")
    //console.log(await allOptions.allInnerTexts())

    let realOptions:string[]=(await allOptions.allTextContents()).map(txt=>txt.trim());

    const originalList:string[]=realOptions;
    const sortedList:string[]=[...realOptions].sort(); // triple dot is used as immutable becasuse string array is mutable

    console.log(originalList)
    console.log(sortedList)
})