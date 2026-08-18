import { test, expect } from "../fixtures/TestFixtures";
import Routing from "../pages/digitRouting.page";

test.describe("Digit Routing", () => {

    test.beforeEach("User Login", async ({ login }) => {
        await login.userLogin(`${process.env.DIGIT_EMAIL}`, `${process.env.DIGIT_PASSWORD}`);
        await login.verifyLogin();
    });
    
    test("Verify Create, Update, and Delete Routing Step",{ tag: "@digit" },async ({ page }) => {
            test.setTimeout(50000);
            const routing = new Routing(page);
            await routing.createRoutingStep('Test Routing Step');
            await routing.updateRoutingStep(); 
            await routing.deleteRoutingStep(); 
        }
    );


});