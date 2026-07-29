import {test,expect} from "../fixtures/TestFixtures";

test.describe("DigitLogin tests",{tag:"@digit"}, () => {
    test("Digit login with valid credentials", async ({ page, login }) => {
        
        login.navigateToApplication();
        login.enterEmail(`${process.env.DIGIT_EMAIL}`);
        login.clickContinue();
        login.enterPassword(`${process.env.DIGIT_PASSWORD}`);
        login.clickContinue();
        await page.waitForLoadState('networkidle');
        expect(page).toHaveTitle(/Scorecard/);
        expect(page).toHaveURL(/scorecard/);
    })
})