import {test,expect} from "@playwright/test"

test.use({
    screenshot:'on'
})
test("Mock API Response",async ({page})=>{
    
    //Mock API response
    await page.route("*/**/api/v1/fruits",async route=>{
        const response=await route.fetch();
        const json=await response.json();
        json.push({name:"API Testing using playwright",id:101})
        json.push({name:"Playwright Mocking",id:103})
        json.push({name:"API Testing using Postman",id:102})
        await route.fulfill({response,json})
    })
    // Validation
    await page.goto("https://demo.playwright.dev/api-mocking/")
    await expect(page.getByText("API Testing using playwright")).toBeVisible();
    await expect(page.getByText("Playwright Mocking", { exact: true })).toBeVisible();
    await expect(page.getByText("API Testing using Postman")).toBeVisible();
    await page.waitForTimeout(5000)

})
