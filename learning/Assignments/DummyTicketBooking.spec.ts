

import {test,expect,Locator,Page} from "@playwright/test"

async function selectDate(expYear:string,expMon:string,expDate:string,page:Page,isDOB:boolean)
{   
    // await page.locator(".ui-datepicker-month").selectOption({value:"9"});
    // await page.locator(".ui-datepicker-year").selectOption({value:"2002"});
    await page.locator(".ui-datepicker-month").selectOption(expMon);
    await page.locator(".ui-datepicker-year").selectOption(expYear);

    const allDates:Locator[]=await page.locator(".ui-datepicker-calendar tbody td").all();
    for(let dt in allDates)
    {
        const actDate=await allDates[dt].innerText();
        if(actDate==expDate)
        {
            await allDates[dt].click();
            break;
        }
    }
}
test("Validate Ticket Booking",async ({page})=>{

    await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/");
    await expect(page).toHaveTitle(/Dummy ticket/i);

    //Fill the Booking Details
    await page.locator("#product_549").click();
    await page.locator("#travname").fill("Aravind");
    await page.locator("#travlastname").fill("Myathar");
    await page.locator("#dob").click();
    await selectDate("1966","Oct","19",page,true);
    await page.locator("#sex_1").click();
    await page.locator("#fromcity").fill("Hyderabad");
    await page.locator("#tocity").fill("Banglore");
    await page.locator("#departon").click();
    await selectDate("2026","Oct","19",page,false);

    await page.locator("#billing_phone").fill("987654321");
    await page.locator("#billing_email").fill("qaengineer@gmail.com");
    await page.locator("span[id$='select2-billing_country-container']").click();
    await page.locator("//li[text()='United States (US)']").click();
    await page.locator("#billing_address_1").fill("Hyderabad, Telangana");
    await page.locator("#billing_city").fill("Telangana");
    
    await page.locator("#select2-billing_state-container").click();
    await page.locator("//li[text()='Texas']").click();
    await page.locator("#billing_postcode").fill("500059");
    const actProduct=await page.locator(".product-details").innerText();
    console.log(actProduct)
    await expect(actProduct).toEqual("Dummy return ticket");
    await page.waitForTimeout(3000);
})