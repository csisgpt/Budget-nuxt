import { test, expect } from '@playwright/test';

test('landing page has headline', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('h1').first()).toContainText('اورگافلو');
});
