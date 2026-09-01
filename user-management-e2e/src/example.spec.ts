import { test, expect } from '@playwright/test';

test('shows the login page', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Keep your people moving.' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();
});
