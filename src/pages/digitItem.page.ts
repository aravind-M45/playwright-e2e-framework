import { Page, Locator, expect } from "@playwright/test"

export class DigitItemPage {

    readonly page: Page;
    readonly navItem: Locator;
    readonly newItem: Locator;
    readonly inventoryItem: Locator;
    readonly itemName: Locator;
    readonly defaultStockUoMDropdown: Locator;
    readonly uom: Locator;
    readonly saveButton: Locator;
    readonly closeItemModal: Locator;
    readonly search: Locator;
    readonly selectItem: Locator;
    readonly menu: Locator;
    readonly deleteItemOption: Locator
    readonly deleteCheckbox01: Locator;
    readonly deleteCheckbox02: Locator;
    readonly deleteCheckbox03: Locator;
    readonly confirmItemDelete: Locator
    readonly noResultsFound: Locator
    readonly tableRefresh: Locator

    constructor(page: Page) {
        this.page = page;
        this.navItem = page.getByRole('button', { name: 'Items' })
        this.newItem = page.getByRole('button', { name: 'New item' })
        this.inventoryItem = page.getByText('Inventory item', { exact: true })
        this.itemName = page.getByRole('textbox', { name: 'Name' })
        this.defaultStockUoMDropdown = page.getByRole('combobox', { name: 'Default stock UoM' })
        this.uom = page.getByRole('option', { name: 'Each (ea)' })
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true })
        this.search = page.getByRole('textbox', { name: 'Search...' })
        this.selectItem = page.getByText('E2E_TestItem', { exact: true })
        this.menu = page.getByLabel("Open extra menu")
        this.deleteItemOption = page.getByLabel("Delete item")
        this.deleteCheckbox01 = page.getByLabel('Delete this item permanently')
        this.deleteCheckbox02 = page.getByLabel('Delete item metadata (categories, custom fields)')
        this.deleteCheckbox03 = page.getByLabel('Remove from search & selection')
        this.confirmItemDelete = page.getByRole('button', { name: 'Delete item' })
        this.noResultsFound = page.getByText('No results found', { exact: true })
        this.closeItemModal = page.getByLabel('Close dialog')
        this.tableRefresh=page.getByRole('button', { name: 'Refresh data' })
    }

    async navigateToItemPage() {
        await this.navItem.click();
    }

    async selectInventoryItem() {
        await this.newItem.click();
        await this.inventoryItem.click();
    }

    async enterItemName(name: string) {
        await this.itemName.pressSequentially(name);
    }

    async selectUOM() {
        await this.defaultStockUoMDropdown.click();
        await this.uom.click();
    }

    async saveItem() {
        await this.saveButton.click();
    }

    async verifyItemCreation() {
        await expect(
            this.page.getByRole("heading", { name: "E2E_TestItem" })
        ).toBeVisible();
        await this.closeItemModal.click();
    }

    async searchItem() {
        await this.search.pressSequentially("E2E_TestItem")
        await this.search.press("Enter");
    }
    async selectSearchItem() {
        this.selectItem.click();
    }

    async openMenu() {
        await this.menu.click();
    }

    async selectDeleteOption() {
        await this.deleteItemOption.click();
    }

    async confirmItemDeletion() {
        await this.deleteCheckbox01.click();
        await this.deleteCheckbox02.click();
        await this.deleteCheckbox03.click();
        await this.confirmItemDelete.click();
        await this.verifyItemDeletion()
    }

    async verifyItemDeletion() {
        await this.tableRefresh.click();
        await this.search.clear();
        await this.searchItem();
        await expect(this.noResultsFound).toBeVisible();
    }
}