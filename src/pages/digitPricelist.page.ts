import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class PriceList {
    readonly page: Page;
    readonly priceListName = `Test_Pricelist_${faker.string.alphanumeric(4)}`;
    currentName: string = this.priceListName;
    readonly pricelist: Locator;
    readonly newPriceListButton: Locator;
    readonly nameTextbox: Locator;
    readonly searchItem: Locator;
    readonly itemSearchbar: Locator;
    readonly itemRow: Locator;
    readonly itemRowCheckbox: Locator;
    readonly addItems: Locator;
    readonly customersTab: Locator;
    readonly addCustomer: Locator;
    readonly searchCustomer: Locator;
    readonly customerRow: Locator;
    readonly customerCheckbox: Locator;
    readonly customerAddButton: Locator;
    readonly saveButton: Locator;
    readonly searchPL: Locator;


    constructor(page: Page) {
        this.page = page;
        this.pricelist = page.getByRole('link', { name: 'Price lists' }).first();
        this.newPriceListButton = page.getByRole("button", { name: /New price list/i });
        this.nameTextbox = page.getByRole('textbox', { name: /Name/i });
        this.searchItem = page.locator('span').filter({ hasText: 'Search to add...' }).first();
        this.itemSearchbar = page.getByPlaceholder("Search all items");
        this.itemRow = page.getByRole('row', { name: /Asus TUF - A15 Laptop/ });
        this.itemRowCheckbox = this.itemRow.getByRole('checkbox', { name: 'Toggle select row' });
        this.addItems = page.getByRole('button', { name: /Add items/i });
        this.customersTab = page.getByText('Customers', { exact: true });
        this.addCustomer = page.getByRole('button', { name: /Add customer/i });
        this.searchCustomer = page.getByPlaceholder("Search...").first();
        this.customerRow = page.getByRole('row', { name: /Adidas/ });
        this.customerCheckbox = this.customerRow.getByRole('checkbox', { name: 'Press Space to toggle row' });
        this.customerAddButton = page.getByRole('button', { name: /Add customers/i }).last();
        this.saveButton = page.getByRole('button', { name: /Save/i });
        this.searchPL = page.getByRole('textbox', { name: 'Search...' });
    }

    async goToPriceLists() {
        await this.pricelist.click();
    }
    async openNewPriceList() {
        await this.goToPriceLists();
        await this.newPriceListButton.click();
    }

    async enterName() {
        await this.nameTextbox.fill(this.priceListName);
    }

    /* add item to price list */
    async addItem() {
        await this.searchItem.click();
        await this.itemSearchbar.fill("Asus TUF - A15 Laptop");
        await this.itemRowCheckbox.check();
        await this.addItems.click();
    }

    /* add customer to price list */
    async addCustomerToPriceList() {
        await this.customersTab.click();
        await this.addCustomer.click();
        await this.searchCustomer.fill("Adidas");
        await expect(this.customerRow).toBeVisible();
        await this.customerCheckbox.check();
        await this.customerAddButton.click();
    }

    async save() {
        await this.saveButton.click();
    }

    async expectCreated() {
        await expect(this.page.locator('p').filter({ hasText: this.priceListName })).toBeVisible();
    }

    /** Full end-to-end flow */
    async createPriceList() {
        await this.openNewPriceList();
        await this.enterName();
        await this.addItem();
        await this.addCustomerToPriceList();
        await this.save();
        await this.expectCreated();
    }

    async updatePriceList() {
        const updatedName = `Updated_${this.priceListName}`;
        await this.goToPriceLists();  
        await this.searchPL.fill(this.currentName);
        await this.searchPL.press('Enter');
        await this.page.getByRole('link', { name: this.currentName }).click();
        await this.nameTextbox.fill(updatedName);  
        await this.page.locator('[aria-haspopup="listbox"]').click();
        await this.page.getByText('Inactive', { exact: true }).click();
        await this.page.getByRole('button', { name: /Save/i }).click();
        await expect(this.page.getByRole('button', { name: /Save/i })).toBeDisabled();
        this.currentName = updatedName;
    }
}