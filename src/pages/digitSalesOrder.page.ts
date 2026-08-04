import { Page, Locator, expect } from "@playwright/test";

export class SalesOrderPage {

    readonly page: Page;
    itemName: string = "";          
    readonly salesOrdersMenu: Locator;
    readonly newSalesOrderButton: Locator;
    readonly customerDropdown: Locator;
    readonly addItemsButton: Locator;
    readonly itemSearch: Locator;
    readonly saveButton: Locator;
    readonly salesOrderHeading: Locator;
    readonly searchTextbox: Locator;
    readonly moreMenuButton: Locator;
    readonly deleteOrderMenu: Locator;
    readonly confirmDeleteButton: Locator;

    constructor(page: Page) {

        this.page = page;

        this.salesOrdersMenu = page.getByText("Sales orders", { exact: true });
        this.newSalesOrderButton = page.getByText("New sales order", { exact: true });

        this.customerDropdown = page.locator("#customerId");

        this.addItemsButton = page.getByRole("button", {
            name: /Add items/i
        });

        this.itemSearch = page.getByPlaceholder("Search all items");

        this.saveButton = page.getByRole("button", {
            name: "Save"
        });

        this.salesOrderHeading = page.locator("h4");

        this.searchTextbox = page.getByRole("textbox", {
            name: "Search..."
        });

        this.moreMenuButton = page.getByRole("button", {
            name: "Open extra menu"
        });

        this.deleteOrderMenu = page.getByRole("menuitem", {
            name: "Delete order"
        });

        this.confirmDeleteButton = page.getByRole("button", {
            name: "Delete order"
        });
    }

    async openSalesOrders() {
        await this.salesOrdersMenu.click();
    }

    async clickNewSalesOrder() {
        await this.newSalesOrderButton.click();
    }

    async clickCustomerDropdown() {
        await this.customerDropdown.click();
    }

    async selectCustomer(customerName: string) {

        await this.page
            .getByRole("option", { name: customerName })
            .click();
    }

    async clickAddItems() {
        await this.addItemsButton.click();
    }

    async searchItem(itemName: string) {
        this.itemName = itemName;   
        await this.itemSearch.fill(itemName);
        await this.page.keyboard.press("Enter");
    }

    async selectItem() {
        const row = this.page.getByRole("row", { name: this.itemName });
        const itemCheckbox = row.getByRole("checkbox", { name: "Toggle select row" });
        await expect(itemCheckbox).toBeVisible();
        await itemCheckbox.check();
        await this.addItemsButton.click();
    }

    async saveSalesOrder() {
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
    }

    async getSalesOrderId(): Promise<string> {
        const heading = await this.salesOrderHeading.innerText();
        return heading.match(/SO\d+/)![0];
    }

    async searchSalesOrder(soId: string) {
        await this.searchTextbox.fill(soId);
        await this.page.keyboard.press("Enter");
    }

    async openSalesOrder(soId: string) {
        await this.page
            .getByText(soId, { exact: true })
            .click();
    }

    async deleteSalesOrder() {
        await this.moreMenuButton.click();
        await this.deleteOrderMenu.click();
        await this.confirmDeleteButton.click();
    }

}