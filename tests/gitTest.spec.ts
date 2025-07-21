import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('Enter your email and password to sign in')).toBeVisible();
  await expect(page.getByText('Enter ID or Passport or Cell Phone Number')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByText('Remember Me')).toBeVisible();
  await expect(page.getByText('Forgot password?')).toBeVisible();
  await expect(page.getByText('New application?')).toBeVisible();
  await expect(page.locator('form')).toContainText('Click here');
  await expect(page.getByText('HillCross College Student Management System')).toBeVisible();
});