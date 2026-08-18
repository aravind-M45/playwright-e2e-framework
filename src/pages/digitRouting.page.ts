import { Page, Locator, expect } from "@playwright/test";

class Routing {
    readonly page: Page;
    readonly production: Locator;
    readonly routing: Locator;
    readonly newRoutingButton: Locator;
    readonly routingName: Locator;
    readonly locationDropdown: Locator;
    readonly location: Locator;
    readonly equipmentDropdown: Locator;
    readonly equipment: Locator;
    readonly save: Locator;
    readonly menu: Locator;
    readonly deleteRoutingOption: Locator;
    readonly deleteRoutingButton: Locator;

    private currentRoutingName: string | null = null;

    constructor(page: Page) {
        this.page = page;
        this.production = page.getByText('Production');
        this.routing = page.getByText('Routing');
        this.newRoutingButton = page.getByLabel('New routing step');
        this.routingName = page.locator('[name="name"]');
        this.locationDropdown = page.getByPlaceholder('Set location');
        this.location = page.locator('li:has-text("HYD500032 (WC)")');
        this.equipmentDropdown = page.getByText('Select equipment', { exact: true });
        this.equipment = page.locator("li:has-text('BoltEquipment')");
        this.save = page.getByRole('button', { name: 'Save' });
        this.menu = page.getByLabel("Open extra menu");
        this.deleteRoutingOption = page.getByRole('menuitem', { name: 'Delete operation' });
        this.deleteRoutingButton = page.getByRole("button", { name: "Delete routing step" });
    }

    // ---------- helper functions ----------

    private routingRow(name: string): Locator {
        return this.page.locator('[col-id="name"]').filter({ hasText: name });
    }

    private resolveName(name?: string): string {
        const resolved = name ?? this.currentRoutingName;
        if (!resolved) {
            throw new Error(
                "No routing name provided and none stored. " +
                "Call createRoutingStep(name) first, or pass a name explicitly."
            );
        }
        return resolved;
    }

    // ---------- Action methods ----------

    async goToProduction() {
        await this.production.click();
    }

    async goToRouting() {
        await this.routing.click();
    }

    async clickNewRouting() {
        await this.newRoutingButton.click();
    }

    async enterRoutingName(name: string) {
        await this.routingName.fill(name);
        this.currentRoutingName = name;
    }

    async selectLocation() {
        await this.locationDropdown.click();
        await this.location.click();
    }

    async selectEquipment() {
        await this.equipmentDropdown.click();
        await this.equipment.click();
    }

    async clickSave() {
        await this.save.click();
    }

    async verifyRoutingCreated(name?: string) {
        await expect(this.routingRow(this.resolveName(name))).toBeVisible();
    }

    async createRoutingStep(name: string) {
        await this.goToProduction();
        await this.goToRouting();
        await this.clickNewRouting();
        await this.enterRoutingName(name);
        await this.selectLocation();
        await this.selectEquipment();
        await this.clickSave();
        await this.verifyRoutingCreated(name);
    }

    // ---------- Update flow ----------

    async updateRoutingStep(name?: string) {
        const oldName = this.resolveName(name);
        const newName = "Updated " + oldName;

        await this.routingRow(oldName).click();
        await this.enterRoutingName(newName);
        await this.clickSave();
        await expect(this.routingRow(newName)).toBeVisible();
        this.currentRoutingName = newName;
    }

    // ---------- Delete flow ----------

    async openRoutingStep(name?: string) {
        await this.routingRow(this.resolveName(name)).click();
    }

    async openMenu() {
        await this.menu.click();
    }

    async selectDeleteRouting() {
        await this.deleteRoutingOption.click();
    }

    async clickDeleteRouting() {
        await expect(this.page.getByText("Delete routing step", { exact: true }).first()).toBeVisible();
        await this.deleteRoutingButton.click();
    }

    async verifyRoutingDeleted(name?: string) {
        await expect(this.routingRow(this.resolveName(name))).not.toBeVisible();
    }

    async deleteRoutingStep(name?: string) {
        const target = this.resolveName(name);
        await this.openRoutingStep(target);
        await this.openMenu();
        await this.selectDeleteRouting();
        await this.clickDeleteRouting();
        await this.verifyRoutingDeleted(target);
        this.currentRoutingName = null;
    }
}

export default Routing;