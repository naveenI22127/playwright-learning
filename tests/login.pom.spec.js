const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { DashboardPage } = require('./pages/dashboard.page');

test.describe('Login Page - POM', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
    expect(await dashboardPage.isInventoryVisible()).toBeTruthy();
    expect(await dashboardPage.getInventoryItemsCount()).toBeGreaterThan(0);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_pass');
    await expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
  });

  test('should show error with empty credentials', async ({ page }) => {
    await loginPage.login('', '');
    await expect(await loginPage.getErrorMessage()).toContain('Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
  });
}); 