
import { test,expect } from "../fixtures/TestFixtures";
import { DigitItemPage } from "../pages/digitItem.page";

test.describe("Digit Item", { tag: "@digit" }, () => {
  test.beforeEach(async ({ page,login }) => {
    await login.navigateToApplication();
    await login.enterEmail(process.env.DIGIT_EMAIL!);
    await login.clickContinue();
    await login.enterPassword(process.env.DIGIT_PASSWORD!);
    await login.clickContinue();
  });

  test("Item creation", async ({ page }) => {
    const digitItemPage = new DigitItemPage(page);
    await digitItemPage.navigateToItemPage();
    await digitItemPage.selectInventoryItem();
    await digitItemPage.enterItemName("E2E_TestItem");
    await digitItemPage.selectUOM();
    await digitItemPage.saveItem();
    await digitItemPage.verifyItemCreation();
  });

  test("Item deletion", async ({ page }) => {
    const digitItemPage = new DigitItemPage(page);
    await digitItemPage.navigateToItemPage();
    await digitItemPage.searchItem();
    await digitItemPage.selectSearchItem();
    await digitItemPage.openMenu();
    await digitItemPage.selectDeleteOption();
    await digitItemPage.confirmItemDeletion();
  });
});