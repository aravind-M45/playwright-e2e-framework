import { test, expect } from '@playwright/test';


test('OrangeHRM Login - Verify Dashboard Access', async ({ page }) => {

  // Step 1: Navigate to the OrangeHRM login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',{waitUntil:'load'});

  // Step 2: Fill the Username field with 'Admin'
  await page.locator('input[name="username"]').fill('Admin');

  // Step 3: Fill the Password field with 'admin123'
  await page.locator('input[name="password"]').fill('admin12');

  // Step 4: Click the Login button
  await page.locator('button[type="submit"]').click();

  // Step 5: Verify the user is logged in by checking the URL contains 'dashboard'
  await expect(page).toHaveURL(/dashboard/);

});