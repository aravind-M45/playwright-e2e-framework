import {test,expect} from "../fixtures/TestFixtures";

test.describe("DigitLogin tests",{tag:"@digit"}, () => {
    test("Digit login with valid credentials", async ({ page, login }) => {
        
        await login.navigateToApplication();
        await login.enterEmail(`${process.env.DIGIT_EMAIL}`);
        await login.clickContinue();
        await login.enterPassword(`${process.env.DIGIT_PASSWORD}`);
        await login.clickContinue();
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveTitle(/Scorecard/);
        await expect(page).toHaveURL(/scorecard/);
    })
})