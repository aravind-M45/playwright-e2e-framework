

import {test,expect,Locator} from "@playwright/test"

test("Static web tables",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
        
    const rows:Locator= page.locator("table[name$='BookTable'] tr")
    const rowsCount:number=await rows.count();
    expect(rowsCount).toEqual(7);

    // 1) Printing all the rows:
    const allRows:string[]=(await rows.allInnerTexts()).map(txt=> txt.split("\t"))
    //console.log(allRows);
    
    // 2) All Data from the table:
    const allData:Locator[]= await rows.all();
    for(const r of allData.slice(1))  //slice= skips the spcific index
    {
        const uniqueCell=await r.locator('td').allInnerTexts();
        console.log(uniqueCell.join("\t"));  //join with tab(table like output)
    }

    //3) Print 4th row data
    const fourthRow=await rows.nth(3).locator("td").allInnerTexts();
    console.log(fourthRow);
})