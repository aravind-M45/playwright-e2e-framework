import { test, expect } from "@playwright/test";
import { DigitLoginPage } from "../pages/digitLogin.page"
import {faker} from "@faker-js/faker";

test("Price List", async ({ page }) => {
    let login = new DigitLoginPage(page);
    const priceListName = `Test_Pricelist_${faker.string.alphanumeric(4)}`;
    console.log(`Price List Name: ${priceListName}`);
    await login.navigateToApplication();
    await login.enterEmail(`${process.env.DIGIT_EMAIL}`)
    await login.clickContinue()
    await login.enterPassword(`${process.env.DIGIT_PASSWORD}`)
    await login.clickContinue()
    await expect(page).toHaveTitle(/Scorecard/);
    await expect(page).toHaveURL(/scorecard/)
    await page.getByText("Price lists", { exact: true }).click();
    await page.getByRole("button", { name: /New price list/i }).click();
    await page.getByRole('textbox', { name: /Name/i }).fill(priceListName);
    await page.locator('span').filter({ hasText: 'Search to add...' }).first().click();
    await page.getByPlaceholder("Search all items").fill("Asus TUF - A15 Laptop");
    const laptopRow = page.getByRole('row', { name: /Asus TUF - A15 Laptop/ });
    await laptopRow.getByRole('checkbox', { name: 'Toggle select row' }).check();

    await page.getByRole('button', { name: /Add items/i }).click();
    await page.getByText('Customers', { exact: true }).click();
    await page.getByRole('button', { name: /Add customer/i }).click();

    await page.getByPlaceholder("Search...").first().fill("Adidas");
    await expect(page.getByRole('row', { name: /Adidas/ })).toBeVisible();
    const adidasRow = page.getByRole('row', { name: /Adidas/ });
    await adidasRow.getByRole('checkbox', { name: 'Press Space to toggle row' }).check();

    await page.getByRole('button', { name: /Add customers/i }).last().click();
    await page.getByRole('button', { name: /Save/i }).click();
    await expect(page.locator('p').filter({ hasText: priceListName })).toBeVisible();

})