import {test,expect} from "@playwright/test"

test("Verify Page URL",async ({page})=>{
    await page.goto("https://www.facebook.com/")
    let act_URL:string=await page.url();
    console.log("URL: ",act_URL)
    await expect(page).toHaveURL("https://www.facebook.com/")
})