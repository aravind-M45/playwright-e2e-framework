import { test, expect } from "@playwright/test"

test("Mock API Request using playwright", async ({ page }) => {
    await page.route("*/**/api/v1/fruits", async route => {
        const json = [
            { name: 'Playwright API Mocking', id: '101' },
            { name: 'API Testing', id: '102' },
            { name: 'Postman', id: '103' }
        ]
        await route.fulfill({ json })
    })
    await page.goto("https://demo.playwright.dev/api-mocking/")
    await expect(page.getByText('Playwright API Mocking')).toBeVisible()
    await expect(page.getByText('API Testing')).toBeVisible()
    await expect(page.getByText('Postman')).toBeVisible()
})