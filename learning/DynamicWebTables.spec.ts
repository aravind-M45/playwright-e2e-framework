
import {test,expect,Locator} from "@playwright/test"

test("Validate Dynamic Tables",async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table:Locator=page.locator("table.table-striped tbody");
    await expect(table).toBeVisible();

    // 1) Count number of rows
    const rows:Locator[]=await table.locator("tr").all();
    expect(rows).toHaveLength(4);

    // 2) Getting the Chrome CPU Value

    let CPUValue:string="";
    for(const rw of rows)
    {
        const value:string=await rw.locator("td").nth(0).innerText();
        if(value=="Chrome")
        {
            CPUValue=await rw.locator("td",{hasText:'%'}).innerText();
            console.log("CPU Value of ",value,CPUValue);
            break;
        }
    }
    await page.waitForTimeout(4000);

    // 3) Comparing the yellowBoxValue and CPU value
    let boxValue:string=await page.locator("p#chrome-cpu").innerText();
    console.log("Yellow Box Value: ",boxValue)
    if(boxValue.includes(CPUValue))
        console.log("Both the values are same")
    else 
        console.log("Both the values are not same")


})
