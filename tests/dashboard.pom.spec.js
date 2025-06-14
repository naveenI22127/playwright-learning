const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { DashboardPage } = require('./pages/dashboard.page');

test.describe('Dashboard Page - POM', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('should display inventory after successful login', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
    expect(await dashboardPage.isInventoryVisible()).toBeTruthy();
    expect(await dashboardPage.getInventoryItemsCount()).toBeGreaterThan(0);
  });

  test('should not access dashboard without login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/inventory.html');
    // Should not see inventory
    expect(await dashboardPage.isInventoryVisible()).toBeFalsy();
    expect(await dashboardPage.getInventoryItemsCount()).resolves.toBe(0);
  });
}); 