import { test, expect } from "../fixtures/TestFixtures";

test.describe("Digit Routing",{ tag: "@digit" }, () => {

    test.beforeEach("User Login", async ({ login }) => {
        await login.userLogin(`${process.env.DIGIT_EMAIL}`, `${process.env.DIGIT_PASSWORD}`);
        await login.verifyLogin();
    });

    test("Verify Create, Update, and Delete Routing Step", async ({ routing }) => {
        test.setTimeout(50000);
        await routing.createRoutingStep('Test Routing Step');
        await routing.updateRoutingStep();
        await routing.deleteRoutingStep();
    }
    );
});