
import { test, expect } from "@playwright/test"




let allData: string[][] = [
    ["speed01@gmail.com", "test@123", "valid"],
    ["userorg@gmail.com", "test@123", "invalid"],
    ["qa@gmail.com", "test@123", "invalid"],
    ["", "", "invalid"],
];





for (let [email, pass, validity] of allData) {
    test.describe.parallel("group 1", async () => {
        test(`Login test using ${email} and ${pass}`, async ({ page }) => {
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator(".ico-login").click();
            await page.getByLabel('Email').fill(email)
            await page.getByLabel('password').fill(pass)
            await page.locator("input[value='Log in']").click();

            if (validity === 'valid') {
                console.log(`Login successfull for ${email} and ${pass}`);
                await expect(page.locator(".ico-logout")).toBeVisible({ timeout: 3000 })
                await page.waitForTimeout(3000)
            }
            else {
                console.log(`Login failed for ${email} and ${pass}`);
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login', { timeout: 3000 });
                await expect(page.locator(".validation-summary-errors")).toContainText("Login was unsuccessful", { ignoreCase: true });
            }
        })
    })
}