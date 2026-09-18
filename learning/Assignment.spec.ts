

import { test, expect, Locator } from "@playwright/test"

test("Validate Dynamic web table senarios : Chrome Process", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    const rows: Locator[] = await page.locator("#taskTable tbody tr").all();
    let value = '';
    for (const row of rows) {
        let rw = await row.innerText();
        // console.log(rw);
        if (rw.includes("Chrome")) {
            value = await row.locator("td", { hasText: '%' }).innerText();
            console.log("Actual Chrome value: ", value)
            break;
        }
    }


    let res: string = await page.locator(".display-values p:first-child").innerText();
    if (res.includes(value)) {
        console.log("Both the values are same: ", value)
    } else console.log("Both are not same: ", value)

})


test("Validate FireFox senario", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/")

    const rows: Locator[] = await page.locator("#taskTable tbody tr").all();
    let value = '';
    for (const row of rows) {
        let rw = await row.innerText();

        if (rw.includes("Firefox")) {

            value = await row.locator("td", { hasText: 'MB' }).innerText();
            console.log("Actual firefox value: ", value)

        }
    }
})

test.only("Second senario - Pagination", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows: Locator[] = await page.locator('#productTable tbody tr').all();


    let nextPage: Locator[] = await page.locator(".pagination li").all();

    for (let i=0;i<nextPage.length-1;i++)
    {
        for (let r of rows)
        {
            await r.locator('td:nth-child(4) input').click();
            console.log(await r.allInnerTexts());
        }
        await nextPage[i+1].click();
    }
})
