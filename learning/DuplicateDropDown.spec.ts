
import {test,expect,Locator} from '@playwright/test'

test("Verify Duplicate Drop-down",async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');
    
    //const allOptions:Locator=page.locator("#colors>option") //contains duplicate elements
    const allOptions:Locator=page.locator("#country>option") //contains duplicate elements
    const allText:string[]=(await allOptions.allTextContents()).map(txt=>txt.trim());
    console.log(allText);

    let mySet=new Set<string>();
    let duplicates:string[]=[];

    for(const text of allText)
    {
        if(mySet.has(text))
        {
            duplicates.push(text)
        }
        else
        {
            mySet.add(text)
        }
    }

    if(duplicates.length>0)
    {
        console.log("These are duplicates :",duplicates)
    }
    else
    {
        console.log("No Duplciates found");
    }

    expect(duplicates.length).toBe(0);
})