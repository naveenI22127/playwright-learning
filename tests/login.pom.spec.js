const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');
const { DashboardPage } = require('./pages/dashboard.page');
const users = require('./users.json');

test.describe('Login Page - POM', () => {
  for (const user of users) {
    test(`Login test for user: ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);

      if (user.username === 'locked_out_user') {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('locked out');
      } else {
        const dashboardPage = new DashboardPage(page);
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(dashboardPage.inventoryList).toBeVisible();
      }
    });
  }
}); 