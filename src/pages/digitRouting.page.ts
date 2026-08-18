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
  }

  // ---------- Dynamic locator ----------
  private routingRow(name: string): Locator {
    return this.page.locator('[col-id="name"]').filter({ hasText: name });
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

  async verifyRoutingCreated(name: string) {
    await expect(this.routingRow(name)).toBeVisible();
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
}

export default Routing;