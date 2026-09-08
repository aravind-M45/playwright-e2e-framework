
import { test, expect } from "@playwright/test"
import { TIMEOUT } from "dns"


/*test("Passing Paramenter to test",async ({page})=>{

    await page.goto("http://demowebshop.tricentis.com/");
    await page.locator('#small-searchterms').fill('laptop');
    await page.locator("input[value$='Search']").click();
    await expect(page.locator('h2 a')).toContainText('laptop',{ignoreCase:true});
})*/

// 1) Approch 1 for using external data 

const data: string[] = ["laptop", "computer", "gift card", "smartphone", "tab"]
/*for (let item of data) {
    test(`Passing Paramenter to test ${item}`, async ({ page }) => {
        await page.goto("http://demowebshop.tricentis.com/");
        await page.locator('#small-searchterms').fill(item);
        await page.locator("input[value$='Search']").click();
        await expect(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });
    })
}*/

//Approach 2 using forEach

test.describe.parallel("Group 01",async () => {
    data.forEach((item) => {
        test(`Passing Paramenter to test ${item}`, async ({ page }) => {
            await page.goto("http://demowebshop.tricentis.com/");
            await page.locator('#small-searchterms').fill(item);
            await page.locator("input[value$='Search']").click();
            await expect(page.locator('h2 a').nth(0)).toContainText(item,{ignoreCase: true });
        })
    })
})