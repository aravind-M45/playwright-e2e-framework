import { PriceList } from "../pages/digitPricelist.page";
import { test, expect } from "../fixtures/TestFixtures";


test.describe("Price List", { tag: '@digitPricelist' }, async () => {

    test.beforeEach(async ({ page, login }) => {
        await login.userLogin(`${process.env.DIGIT_EMAIL}`, `${process.env.DIGIT_PASSWORD}`);
        await login.verifyLogin();
    })
    test("Verify Price List creation and updation", async ({ page }) => {
        const priceList = new PriceList(page);
        await priceList.createPriceList();
        await priceList.updatePriceList();
    });
})
