/*
    CSV-Setup
    npm install csv-parse //to work with CSV files
*/





import { test, expect } from "@playwright/test";
import fs from "fs";
import { parse } from "csv-parse/sync";

interface LoginData {
    email: string;
    password: string;
    validity: string;
}

const path = "learning/TestData/loginData02.csv";
const content = fs.readFileSync(path, "utf-8");

const records: LoginData[] = parse(content, {
    columns: true,
    skip_empty_lines: true,
});

test.describe("Group-01", async () => {
    for (const data of records) {
        test(`Handle External CSV data for ${data.email} and ${data.password}`, async ({ page }) => {

            const email = data.email ?? "";
            const password = data.password ?? "";

            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator(".ico-login").click();

            await page.getByLabel("Email").fill(email);
            await page.getByLabel("Password").fill(password);

            await page.locator("input[value='Log in']").click();

            if (data.validity.toLowerCase() === "valid") {

                console.log(`Login successful for ${email}`);

                await expect(page.locator(".ico-logout")).toBeVisible({ timeout: 3000 });

            } else {

                console.log(`Login failed for ${email}`);

                await expect(page).toHaveURL(
                    "https://demowebshop.tricentis.com/login",
                    { timeout: 3000 }
                );

                await expect(page.locator(".validation-summary-errors"))
                    .toContainText("Login was unsuccessful", { ignoreCase: true });

            }

        });
    }
})
/*import {test,expect} from "@playwright/test"
import fs from 'fs'
import {parse} from "csv-parse/sync"

const path='learning/TestData/loginData02.csv';
const content=fs.readFileSync(path,"utf-8");
let records=parse(content,{columns:true,skip_empty_lines:true});


for(const data of records)
{
    test(`Handle External JSON data for ${data.email} and ${data.password}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator(".ico-login").click();
            await page.getByLabel('Email').fill(data.email)
            await page.getByLabel('password').fill(data.password)
            await page.locator("input[value='Log in']").click();

            if (data.validity.toLowerCase() === 'valid') {
                console.log(`Login successfull for ${data.email} and ${data.password}`);
                await expect(page.locator(".ico-logout")).toBeVisible({ timeout: 3000 })
                await page.waitForTimeout(3000)
            }
            else {
                console.log(`Login failed for ${data.email} and ${data.password}`);
                await expect(page).toHaveURL('https://demowebshop.tricentis.com/login', { timeout: 3000 });
                await expect(page.locator(".validation-summary-errors")).toContainText("Login was unsuccessful", { ignoreCase: true });
            }

}*/

