

import {test,expect,Locator} from "@playwright/test"
test("Validate Flight Booking",async ({page})=>{

    await page.goto('https://blazedemo.com/');
    await page.locator("select[name$='fromPort'] ").selectOption('Mexico City');
    await page.locator("select[name$='toPort']  ").selectOption({value:'New York'});
    await page.locator("input[type$='submit']").click();
    await page.waitForTimeout(3000);


    let rows:Locator[]=await page.locator(".table tbody tr").all();
    
    let lowPrice:any=Number.MAX_SAFE_INTEGER;
    let rowLoc:Locator=page.locator("");
    for(let r of rows)
    {
        let priceTxt =await r.locator("td:nth-child(7)").innerText();
        let actPrice:Number=Number(priceTxt.replace("$"," ").trim());  //using trim and covert to num
        console.log(actPrice);
        if(actPrice<lowPrice)
        {
            lowPrice=actPrice;
            rowLoc=r;
        }
    }
    console.log(lowPrice);
    await rowLoc.locator('td:nth-child(2) input').click();
    await page.waitForTimeout(3000)


    //Filling the Details -----------------


    await page.locator("#inputName").fill("Aravind");
    await page.locator("#address").fill("Hyderabad");
    await page.locator("#city").fill("Aravind");
    await page.locator("#state").fill("Hyderabad");
    await page.locator("#zipCode").fill("Aravind");
    await page.locator("#address").fill("Hyderabad");
    await page.locator("#cardType").selectOption({value:'amex'});
    await page.locator("#creditCardNumber").fill("987654321");
    await page.locator("#nameOnCard").fill("Myathar Aravind");
    await page.locator("#rememberMe").click();
    await page.waitForTimeout(5000);
    await page.locator("input[value='Purchase Flight']").click();
    await page.waitForTimeout(3000);

    let head:string=await page.locator('h1').innerText();
    console.log(head);
    expect(head).toBe("Thank you for your purchase today!");

})