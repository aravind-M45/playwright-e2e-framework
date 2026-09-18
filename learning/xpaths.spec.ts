
import {test,expect, Locator} from "@playwright/test"
import { Console } from "console";

test("Verify xpath",async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");

    //1) Relative X-path And 2) Absolute X-path
    const act_text:Locator =page.locator("//strong[text()='Featured products']")
    await expect(act_text).toBeVisible();



    // 3) Contains - Method
    let products:Locator=page.locator('//h2/a[contains(@href,"computer")]');
    let pcount:number=await products.count()
    console.log(pcount);
    expect(pcount).toBeGreaterThan(0)

    //console.log(await products.textContent())   //throws error because product contains multiple elements

    console.log(await products.first().textContent())
    console.log(await products.last().textContent())
    console.log(await products.nth(3).textContent())

    // Printing all the content --> LOOPS

    let allPro:Locator=page.locator('//h2/a[contains(@href,"computer")]');
    let arr:string[]=await allPro.allTextContents();
    
    console.log("All the Content in  the Product are here: ",allPro)
    console.log();
    for(let i=0;i<=arr.length;i++)
    {
        console.log(arr[i])
    }

    // 4) starts-with()
    // 5)  text()='hello'
    // 6) postition()=2
})