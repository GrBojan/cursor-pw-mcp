import { test, expect } from '../fixtures';
import { chromium } from '@playwright/test';
import { StorageState } from '../src/pages/StorageState';

const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
    invalid: { username: 'invalid_user', password: 'wrong_password' },
    empty: { username: '', password: '' },
};

test.describe('SauceDemo Login Page', () => {
    test.only('Locked out user cannot login', async ({ loginPage, page, basePage }, testInfo) => {
        await basePage.annotateBrowserVersion(testInfo);
        await loginPage.navigate('/');
        await loginPage.login(users.locked.username, users.locked.password);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page).not.toHaveURL(/.*inventory\.html/);
    });

    test('Problem user login', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login(users.problem.username, users.problem.password);
        await expect(page).toHaveURL(/.*inventory\.html/);
        // Optionally, add checks for UI/data issues on inventory page
    });

    test('Performance glitch user login', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        const start = Date.now();
        await loginPage.login(users.glitch.username, users.glitch.password);
        await expect(page).toHaveURL(/.*inventory\.html/);
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(10000);
    });

    test('Invalid credentials show error', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login(users.invalid.username, users.invalid.password);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page).not.toHaveURL(/.*inventory\.html/);
    });

    test('Empty fields show error', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login(users.empty.username, users.empty.password);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page).not.toHaveURL(/.*inventory\.html/);
    });

    test('UI elements are present on login page', async ({ page }) => {
        await page.goto('/');
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();
    });

    test('Password input is masked', async ({ page }) => {
        await page.goto('/');
        const type = await page.getAttribute('#password', 'type');
        expect(type).toBe('password');
    });

    test('Error message disappears after successful login', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login(users.invalid.username, users.invalid.password);
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page.locator('[data-test="error"]')).not.toBeVisible();
    });

    test('Session persistence after login', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/.*inventory\.html/);
        await page.reload();
        await expect(page).toHaveURL(/.*inventory\.html/);
    });
});