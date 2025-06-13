const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { DashboardPage } = require('./pages/dashboard.page');

const VALID_USER = { username: 'standard_user', password: 'secret_sauce' };

test.describe('Dashboard Page - POM', () => {
  test('Dashboard is visible after login and logout returns to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_USER.username, VALID_USER.password);

    const dashboardPage = new DashboardPage(page);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(dashboardPage.inventoryList).toBeVisible();

    await dashboardPage.logout();
    await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/v1\/(index\.html)?/);
    await expect(loginPage.loginButton).toBeVisible();
  });
}); 