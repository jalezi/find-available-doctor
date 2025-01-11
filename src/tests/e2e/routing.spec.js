// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('has correct language', () => {
  test('has "sl" lang attribute', async ({ page }) => {
    await page.goto('/');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'sl');

    await page.goto('/sl');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'sl');
  });

  test('has "en" lang attribute', async ({ page }) => {
    await page.goto('/en');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('has "de" lang attribute', async ({ page }) => {
    await page.goto('/de');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  });

  test('has "hr" lang attribute', async ({ page }) => {
    await page.goto('/hr');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'hr');
  });

  test('has "hu" lang attribute', async ({ page }) => {
    await page.goto('/hu');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'hu');
  });

  test('has "it" lang attribute', async ({ page }) => {
    await page.goto('/it');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'it');
  });
});

test.describe('has correct route', () => {
  test('FAQ page has "sl" lang attribute', async ({ page }) => {
    await page.goto('/faq');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'sl');
  });

  test('About page has "sl" lang attribute', async ({ page }) => {
    await page.goto('/about');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'sl');
  });

  test('Analytics page has "sl" lang attribute', async ({ page }) => {
    await page.goto('/analytics');

    // Expect the page to have a lang attribute.
    await expect(page.locator('html')).toHaveAttribute('lang', 'sl');
  });
});
