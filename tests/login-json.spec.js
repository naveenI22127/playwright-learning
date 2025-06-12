const { test, expect } = require('@playwright/test');
const users = require('./users.json');

test.describe('Login functionality with JSON users', () => {
  users.forEach(user => {
    test(`Login test for user: ${user.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/v1/');
      await page.fill('#user-name', user.username);
      await page.fill('#password', user.password);
      await page.click('#login-button');

      if (user.username === 'locked_out_user') {
        // Should show error for locked out user
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText('locked out');
      } else {
        // Should login successfully for other users
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(page.locator('.inventory_list')).toBeVisible();
        // Logout step
        await page.click('.bm-burger-button');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL(/https:\/\/www\.saucedemo\.com\/v1\/(index\.html)?/);
      }
    });
  });
}); 