// testFixture.ts
import { test as base, } from '@playwright/test';
import { SalesOrderPage } from '../pages/digitSalesOrder.page';
import { DigitLoginPage } from '../pages/digitLogin.page';
import Routing from "../pages/digitRouting.page" 

export const test = base.extend<{
  saveLogs: void;
  login: DigitLoginPage;
  salesOrder: SalesOrderPage;
  routing:Routing;
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
  routing:async({page},use)=>{
    const routing=new Routing(page);
    await use(routing);
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
