//zero shot prompt
// write test script for login functionality of https://www.saucedemo.com/v1

// @filename: tests/login.spec.js

const { test, expect } = require('@playwright/test');

test('Login functionality - valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');

  // Fill in login form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');

  // Click login
  await page.click('#login-button');

  // Assertion: URL should contain inventory.html
  await expect(page).toHaveURL(/.*inventory\.html/);

  // Optionally: check for an element on the inventory page
  await expect(page.locator('.inventory_list')).toBeVisible();
});
