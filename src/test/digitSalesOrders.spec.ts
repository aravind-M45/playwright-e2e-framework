import { test, expect } from "@playwright/test";
import { SalesOrderPage } from "../pages/digitSalesOrder.page";
import { DigitLoginPage } from "../pages/digitLogin.page";

test.describe("Sales order", { tag: "@digit" }, () => {

    let salesOrder: SalesOrderPage;
    let login: DigitLoginPage;
    let soId: string;

    test.beforeEach(async ({ page }) => {

        login = new DigitLoginPage(page);
        salesOrder = new SalesOrderPage(page);
        await login.navigateToApplication();
        await login.enterEmail(process.env.DIGIT_EMAIL!);
        await login.clickContinue();
        await login.enterPassword(process.env.DIGIT_PASSWORD!);
        await login.clickContinue();
        await page.waitForURL(/scorecard/);
        await expect(page).toHaveTitle(/Scorecard/);
    });

    test("Verify Sales Order creation", async () => {
        await salesOrder.openSalesOrders();
        await salesOrder.clickNewSalesOrder();

        await salesOrder.clickCustomerDropdown();
        await salesOrder.selectCustomer("Adidas");

        await salesOrder.clickAddItems();
        await salesOrder.searchItem("Asus TUF - A15 Laptop");
        await salesOrder.selectItem();

        await salesOrder.saveSalesOrder();

        await expect(salesOrder.salesOrderHeading)
            .toHaveText(/Sales order SO\d+/);

        soId = await salesOrder.getSalesOrderId();
        console.log(soId);
    });

    test("Verify Sales Order deletion", async () => {
        await salesOrder.openSalesOrders();
        await salesOrder.searchSalesOrder(soId);
        await salesOrder.openSalesOrder(soId);
        await salesOrder.deleteSalesOrder();
    });

});