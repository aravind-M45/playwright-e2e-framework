
import { test, expect } from "../fixtures/TestFixtures";
import { DigitItemPage } from "../pages/digitItem.page";

test("File Upload", async ({ page, login }) => {

    await login.userLogin(`${process.env.DIGIT_EMAIL}`, `${process.env.DIGIT_PASSWORD}`);
    await login.verifyLogin();
    const item = new DigitItemPage(page);
    await item.navigateToItemPage();
    await page.getByRole('tab', { name: 'Service items' }).click();
    await page.getByRole('textbox', { name: 'Search...' }).fill("POServiceItem");
    await page.getByText("POServiceItem").click();

    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByRole('button', { name: 'Add photo', exact: true }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('./tests/uploads/Bottle.jpg');

    await page.getByRole('button', { name: 'Done', exact: true }).click();

    await expect(page.getByText('Default', { exact: true })).toBeVisible();
    await page.getByRole('button',{name:"Save"}).click();

})