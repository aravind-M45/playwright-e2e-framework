// testFixture.ts
import { test as base, } from '@playwright/test';
import { Test01 } from '../pages/testcase01.page';
import { SalesOrderPage } from '../pages/digitSalesOrder.page';
import { DigitLoginPage } from '../pages/digitLogin.page';

export const test = base.extend<{
  saveLogs: void;
  testObj: Test01;
  login: DigitLoginPage;
  salesOrder: SalesOrderPage;
}>({
  saveLogs: [
    async ({ page }, use, testInfo) => {

      console.log('Global before is running ...');
      await use();
      console.log('Global afterEach is running ...');

      if (testInfo.status !== testInfo.expectedStatus) { 
        const screenshot = await page.screenshot();     
        await testInfo.attach('failure-screenshot', {   
          body: screenshot,
          contentType: 'image/png',
        });
      }
    },
    { auto: true },
  ],
  testObj: async ({ page }, use) => {
    const testObj = new Test01(page);
    await use(testObj);
  },
  salesOrder: async ({ page }, use) => {
    const salesOrder = new SalesOrderPage(page);
    await use(salesOrder);
  },
  login: async ({ page }, use) => {
    const login = new DigitLoginPage(page);
    await use(login);
  }
});

export { expect } from "@playwright/test";
