

import { test, expect } from "@playwright/test"
import fs from 'fs'; //import

//Reading Data from JSON
const path = 'learning/TestData/loginData.json'; //Path of Data
const loginData: any = JSON.parse(fs.readFileSync(path, 'utf-8')); // for reading the data from JSON File

test.describe.parallel("Group-01", async () => {

    for (let { email, password, validity } of loginData) {
        test(`Handle External JSON data for ${email} and ${password}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator(".ico-login").click();
            await page.getByLabel('Email').fill(email)
            await page.getByLabel('password').fill(password)
            await page.locator("input[value='Log in']").click();

            if (validity.toLowerCase() === 'valid') {
                console.log(`Login successfull for ${email} and ${password}`);
                await expect(page.locator(".ico-logout")).toBeVisible({ timeout: 3000 })
                await page.waitForTimeout(3000)
            }
            else {
                console.log(`Login failed for ${email} and ${password}`);
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login', { timeout: 3000 });
                await expect(page.locator(".validation-summary-errors")).toContainText("Login was unsuccessful", { ignoreCase: true });
            }

        })

    }
})


