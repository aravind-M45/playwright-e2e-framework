import { PriceList } from "../pages/digitPricelist.page";
import {test,expect} from "../fixtures/TestFixtures";

test("Price List", async ({ page,login}) => {
    const priceList = new PriceList(page);
    await login.userLogin(`${process.env.DIGIT_EMAIL}`,`${process.env.DIGIT_PASSWORD}`);
    await login.verifyLogin();
    //Full E2E price list creation flow
    await priceList.createPriceList();
});