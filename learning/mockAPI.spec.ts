import {test,expect} from "@playwright/test";

test("Mocking API requests",async ({page})=>{

    await page.route('*/**/api/v1/fruits', route=>{
        const json=[
             { "name": "Aravind", "id": 101 },
            { "name": "Hyderabad", "id": 102 },
        ]
        route.fulfill({json})
    });
    
    await page.goto("https://demo.playwright.dev/api-mocking/")
    await expect(page.getByText("Aravind")).toBeVisible()
    await expect(page.getByText("Hyderabad")).toBeVisible()
})