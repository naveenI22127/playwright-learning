class DashboardPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = '.inventory_list';
    this.inventoryItem = '.inventory_item';
    this.burgerMenu = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
  }

  async isInventoryVisible() {
    return this.page.isVisible(this.inventoryContainer);
  }

  async getInventoryItemsCount() {
    return this.page.locator(this.inventoryItem).count();
  }

  async logout() {
    await this.page.click(this.burgerMenu);
    await this.page.click(this.logoutLink);
  }
}

module.exports = { DashboardPage }; 