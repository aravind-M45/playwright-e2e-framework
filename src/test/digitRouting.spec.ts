import { test, expect } from "../fixtures/TestFixtures";
import Routing from "../pages/digitRouting.page"

test("Production Routing", async ({ page, login }) => {
    test.setTimeout(50000);
    await login.userLogin(`${process.env.DIGIT_EMAIL}`, `${process.env.DIGIT_PASSWORD}`);
    await login.verifyLogin();
    const routing=new Routing(page);
    await routing.createRoutingStep('Test Routing Step')
})