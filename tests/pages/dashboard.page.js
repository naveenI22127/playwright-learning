// Page Object for the Dashboard (Inventory) Page
class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.menuButton = page.locator('.bm-burger-button');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async isInventoryVisible() {
    return this.inventoryList.isVisible();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { DashboardPage }; 