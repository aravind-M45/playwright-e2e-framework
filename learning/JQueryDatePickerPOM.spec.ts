
import {test,expect,Locator,Page} from "@playwright/test"



async function selectDate(expYear:string, expMonth:string, expDate:string, page:Page, isFuture:boolean)
{
    while(true)
    {
        let actMonth=await page.locator(".ui-datepicker-month").innerText();
        let actYear=await page.locator(".ui-datepicker-year").innerText();

        if(expMonth==actMonth&&expYear==actYear)
        {
            //Option 1: Assert as a combined string
            expect(`${actMonth},${actYear}`).toBe(`${expMonth},${expYear}`);
            
            //Option 2: Assert as an object
            // expect({ month: actMonth, year: actYear }).toEqual({ month: expMonth, year: expYear });
            break;
        }

        if(isFuture)
        {
            //Future;
            await page.locator("//a[@title='Next']").click();

        }
        else
        {
            //Past
            await page.locator("//a[@title='Prev']").click();

        }
    }
    
    
    let allDates:Locator[]=await page.locator(".ui-datepicker-calendar td").all();

    for(let d of allDates)
    {
        let actDate=await d.innerText();
        if(actDate==expDate)
        {
            d.click();
            expect(actDate).toBe(expDate);
        }
    }
}


test("Validate Date-Picker",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Approach-01
    /*await page.locator("#datepicker").fill("10/19/2026");    //mm/dd/yyyy
    await page.waitForTimeout(3000);*/

    // Approach-02
    await page.locator("#datepicker").click();

    const expYear='2028';
    const expMonth='June';
    const expDate='19';

    await selectDate(expYear,expMonth,expDate,page,true);
        
    await page.waitForTimeout(3000);
})