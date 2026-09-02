import { test, expect } from "../fixtures/TestFixtures";

test.describe("Digit Item", { tag: "@digit" }, () => {
    test.beforeEach(async ({ page, login }) => {
      await login.navigateToApplication();
      await login.enterEmail(process.env.DIGIT_EMAIL!);
      await login.clickContinue();
      await login.enterPassword(process.env.DIGIT_PASSWORD!);
      await login.clickContinue();
    });

    test("Inventory Item creation", async ({digitItem }) => {
      await digitItem.navigateToItemPage();
      await digitItem.selectInventoryItem();
      await digitItem.enterItemName("E2E_TestItem");
      await digitItem.selectUOM();
      await digitItem.saveItem();
      await digitItem.verifyItemCreation();
    });

    test("Inventory Item deletion", async ({digitItem }) => {
      await digitItem.navigateToItemPage();
      await digitItem.searchItem();
      await digitItem.selectSearchItem();
      await digitItem.openMenu();
      await digitItem.selectDeleteOption();
      await digitItem.confirmItemDeletion();
    });

    test("Verify Service Item File Upload",async ({digitItem})=>{
      await digitItem.navigateToItemPage();
      await digitItem.navToServiceItems();
      await digitItem.searchServiceItems();
      await digitItem.serviceItemFileUpload();
    })
});