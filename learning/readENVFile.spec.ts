
import {test,expect} from "@playwright/test";

test("Read ENV File",async ({page})=>{
    await page.goto(`${process.env.GOOGLE_URL}`);
    const gmail:string=await page.locator('[aria-label="Gmail "]').innerText();
    console.log(gmail);
    expect(gmail).toBe("Gmail");
})