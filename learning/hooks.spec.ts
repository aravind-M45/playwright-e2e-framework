import { test, expect, Page, Locator } from "@playwright/test"


let page: Page;
test.beforeAll("Launch URL", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://demoblaze.com/index.html');
})

test.beforeEach('User Login', async () => {
    await page.locator('//a[@id="login2"]').click();
    await page.locator("//input[@id='loginusername']").fill('pavanol');
    await page.locator("//input[contains(@id,'loginpassword')]").fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
});

// test('Testcase_003 Validate LOGO', async () => {
//         const logo = page.locator('#nava')
//         await expect(logo).toBeVisible();
//     })

test.describe('TestGrouping',async() => {
    //--grep TestGroupin in CMD
    test('Testcase_001 Validate LOGO', async () => {
        const logo = page.locator('#nava')
        await expect(logo).toBeVisible();
    })
    test('Testcase_002 count products', async () => {
        const products = await page.locator('#tbodyid h4 a').allInnerTexts();
        expect(products).toHaveLength(9);
        for (let p in products) {
            console.log(products[p]);
        }
    })
})
test.afterEach('User Logout', async () => {
    await page.locator("//a[contains(@id,'logout2')]").click();
})

test.afterAll('Close App', async () => {
    await page.close();
})