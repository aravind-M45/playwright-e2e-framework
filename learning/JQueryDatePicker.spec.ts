
import {test,expect,Locator} from "@playwright/test"

test("Validate Date-Picker 01",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Approach-01
    /*await page.locator("#datepicker").fill("10/19/2026");    //mm/dd/yyyy
    await page.waitForTimeout(3000);*/

    // Approach-02
    await page.locator("#datepicker").click();

    const expYear='2024';
    const expMonth='June';
    const expDate='19';

    while(true)
    {
        let actMonth=await page.locator(".ui-datepicker-month").innerText();
        let actYear=await page.locator(".ui-datepicker-year").innerText();

        if(expMonth==actMonth&&expYear==actYear)
        {
            break;
        }

        //Future;
        //await page.locator("//a[@title='Next']").click();
        //Past
        await page.locator("//a[@title='Prev']").click();
    }
    await page.waitForTimeout(3000);
    
    
    let allDates:Locator[]=await page.locator(".ui-datepicker-calendar td").all();

    for(let d of allDates)
    {
        let actDate=await d.innerText();
        if(actDate==expDate)
        {
            d.click();
        }
    }
        
    await page.waitForTimeout(3000);
})

test.only("Validate Date-Picker 02",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Approach -> 01  (dd/mm/yyyy)  19/10/2026
    /*await page.locator("#txtDate").evaluate( el => el.removeAttribute("readonly"))  //Used for disable readonly mode temporaryly
    await page.locator("#txtDate").fill("19/10/2026");
    await page.waitForTimeout(3000);*/

    //Approcah -> 02
    let expDate='19';
    let expYear='2027'
    let expMonth='Oct'
    await page.locator("#txtDate").click();
    await page.locator(".ui-datepicker-month").selectOption(expMonth);
    await page.locator(".ui-datepicker-year").selectOption(expYear);

    let isFound=false;
    let allDates:Locator[]=await page.locator(".ui-datepicker tbody td").all();
    for(let dt of allDates)
    {
        const actDate=await dt.innerText();
        if(actDate==expDate)
        {
            await dt.click();
            isFound=true;
        }
    }
    expect(isFound).toBeTruthy();
    await page.waitForTimeout(3000);

})