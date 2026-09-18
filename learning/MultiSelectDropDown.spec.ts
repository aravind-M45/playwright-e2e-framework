

import {test,expect,Locator} from "@playwright/test"

test("Verify Multi-Select DD",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    // 4ways to select multi options
    //await page.locator("#animals").selectOption(['Cat','Cheetah','Dog']) //using visible text
    //await page.locator("#animals").selectOption(['cat','dog'])    //using value attribute
    //await page.locator("#animals").selectOption([{label:'Cat'},{label:'Dog'}]) //using label options
    const both:string[]=await page.locator("#animals").selectOption([{index:0},{index:3}]) //using index options
    console.log(both);
   

    //Check count
     const optionCount:Locator=page.locator('#colors>option')
     expect(optionCount).toHaveCount(7);

     //Check option present in DD

    const allOptions:string[]=await (await optionCount.allTextContents()).map(txt=>txt.trim())
    for(let e of allOptions)
    {
        console.log(e)
    }
    expect(allOptions).toContainEqual('Red');
    await page.waitForTimeout(3000) 
})
