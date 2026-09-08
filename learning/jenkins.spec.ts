import {test,expect} from "@playwright/test"

test("Validate Facebook Title",{tag:"@playwrightwithjenkins"},async ({page})=>{
    await page.goto("https://www.facebook.com/");
    await expect(page).toHaveTitle('Facebook');
})

test("validate amazon title",{tag:"@playwrightwithjenkins"},async ({page})=>{
    await page.goto("https://www.amazon.in/");
    await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');
})

test("validate google title",{tag:"@playwrightwithjenkins"},async ({page})=>{
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google123');
})