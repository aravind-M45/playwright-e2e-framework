import { test, expect } from '@playwright/test';

test('test', async ({ page ,context}) => {

  // Can implement Tracing in 3 ways
  /*1) Using config file 
            trace-'on'   will save in results and HTML report
    2) using command prompt 
          npx playwright test tracing.spec.ts --trace on   will save in results and HTML report

    3)Tracing using programming
          context.tracing.start({screenshot:true,snapshot:true}); //for start and need open using 
          context.tracing.stop({path:'traceReport.zip'})          npx playwright show-trace traceReport.zip
    
    */
  await context.tracing.start({screenshots:true,snapshots:true}); //start

  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#logout2')).toContainText('Log out');
  await page.getByRole('link', { name: 'Log out' }).click();


  await context.tracing.stop({path:'traceReport.zip'})
});