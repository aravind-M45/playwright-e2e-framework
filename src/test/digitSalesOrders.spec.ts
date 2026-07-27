import { test, expect } from "@playwright/test"


test.describe("Sales order",{tag:"@digit"}, () => {
    let soId: string;

    test.beforeEach(async ({ page }) => {
        //Login
        await page.goto(`${process.env.DIGIT_URL}`)
        await page.getByPlaceholder("Enter email or username").fill(`${process.env.DIGIT_EMAIL}`)
        await page.locator(".cl-formButtonPrimary").click()
        await page.getByPlaceholder("Enter your password").fill(`${process.env.DIGIT_PASSWORD}`)
        await page.locator(".cl-formButtonPrimary").click()
        await page.waitForURL(/scorecard/, { timeout: 20000 });
        await expect(page).toHaveTitle(/Scorecard/);
    })

    test("Verify Sales Order creation", async ({ page }) => {
        //SO creation
        await page.getByText('Sales orders', { exact: true }).click();
        await page.getByText('New sales order', { exact: true }).click();
        await page.locator("#customerId").click();

        await page.locator("#customerId-listbox li").allInnerTexts().then(async (text) => {
            for (let i = 0; i < text.length; i++) {
                if (text[i].includes("Adidas")) {
                    await page.locator("ul li").nth(i).click({ timeout: 10000 });
                    console.log("Adidas selected");
                }
            }
        })

        await page.getByRole('button', { name: /Add items/i }).click();
        await page.getByPlaceholder("Search all items").pressSequentially("Asus TUF - A15 Laptop")

        const itemCheckbox = page.getByRole('checkbox', { name: 'Toggle select row' });
        await expect(itemCheckbox).toBeVisible({ timeout: 15000 });
        await itemCheckbox.check();

        await page.getByRole('button', { name: 'Add items' }).click();
        await page.getByRole('button', { name: 'Save' }).click();
        const soHeading = page.locator('h4');
        await expect(soHeading).toHaveText(/Sales order SO\d+/);
        const headingText = await soHeading.textContent();
        soId = headingText!.replace('Sales order ', '');
        console.log(soId); 
    })

    test("Verify Sales Order deletion", async ({ page }) => {
        await page.getByText('Sales orders', { exact: true }).click();
        await page.getByRole('textbox', { name: 'Search...' }).pressSequentially(soId);
        await page.getByText(soId, { exact: true }).click();
        await page.getByRole('button', { name: 'Open extra menu' }).click();
        await page.getByRole('menuitem', { name: 'Delete order' }).click();
        await page.getByRole('button', { name: 'Delete order' }).click();
    })
})