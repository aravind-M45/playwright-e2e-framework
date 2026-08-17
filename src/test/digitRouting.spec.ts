import { test, expect } from "../fixtures/TestFixtures";

test("Production Routing", async ({ page, login }) => {
    test.setTimeout(50000);
    await login.navigateToApplication();
    await login.enterEmail(`${process.env.DIGIT_EMAIL}`);
    await login.clickContinue();
    await login.enterPassword(`${process.env.DIGIT_PASSWORD}`);
    await login.clickContinue();
    await expect(page).toHaveTitle(/Scorecard/);
    await expect(page).toHaveURL(/scorecard/);

    await page.getByText('Production').click();
    await page.getByText('Routing').click();
    await page.getByLabel('New routing step').click();
    await page.locator('[name="name"]').fill('Test Routing Step');
    await page.getByPlaceholder('Set location').click();
    await page.locator('li:has-text("HYD500032 (WC)")').click();
    await page.getByText('Select equipment', { exact: true }).click();
    await page.locator("li:has-text('BoltEquipment')").click();
    await page.getByRole('button', { name: 'Save' }).click();
    await expect (page.locator('[col-id="name"]').filter({hasText: 'Test Routing Step'})).toBeVisible();
})