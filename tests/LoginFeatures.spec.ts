import { test, expect } from '../fixtures';

const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
    problem: { username: 'problem_user', password: 'secret_sauce' },
    glitch: { username: 'performance_glitch_user', password: 'secret_sauce' },
    invalid: { username: 'invalid_user', password: 'wrong_password' },
    empty: { username: '', password: '' },
};

test.describe('SauceDemo Login Page', () => {
    test('Locked out user cannot login', async ({ loginPage, page, basePage }, testInfo) => {
        await test.step('Annotate browser version', async () => {
            await basePage.annotateBrowserVersion(testInfo);
        });

        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });

        await test.step('Attempt login with locked out user', async () => {
            await loginPage.login(users.locked.username, users.locked.password);
        });

        await test.step('Verify error message is visible', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });

        await test.step('Verify user is not redirected to inventory', async () => {
            await expect(page).not.toHaveURL(/.*inventory\.html/);
        });
    });

    test('Problem user login', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        await test.step('Login as problem user', async () => {
            await loginPage.login(users.problem.username, users.problem.password);
        });
        await test.step('Verify navigation to inventory', async () => {
            await expect(page).toHaveURL(/.*inventory\.html/);
        });
        // Optionally, add checks for UI/data issues on inventory page
    });

    test('Performance glitch user login', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        let duration = 0;
        await test.step('Login as performance glitch user and measure duration', async () => {
            const start = Date.now();
            await loginPage.login(users.glitch.username, users.glitch.password);
            duration = Date.now() - start;
        });
        await test.step('Verify navigation to inventory', async () => {
            await expect(page).toHaveURL(/.*inventory\.html/);
        });
        await test.step('Verify login duration is less than 10 seconds', async () => {
            expect(duration).toBeLessThan(10000);
        });
    });

    test('Invalid credentials show error', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        await test.step('Login with invalid credentials', async () => {
            await loginPage.login(users.invalid.username, users.invalid.password);
        });
        await test.step('Verify error message is visible', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
        await test.step('Verify user is not redirected to inventory', async () => {
            await expect(page).not.toHaveURL(/.*inventory\.html/);
        });
    });

    test('Empty fields show error', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        await test.step('Login with empty fields', async () => {
            await loginPage.login(users.empty.username, users.empty.password);
        });
        await test.step('Verify error message is visible', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
        await test.step('Verify user is not redirected to inventory', async () => {
            await expect(page).not.toHaveURL(/.*inventory\.html/);
        });
    });

    test('UI elements are present on login page', async ({ page, loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('/');
        });
        await test.step('Verify username field is visible', async () => {
            await expect(loginPage['usernameLocator']).toBeVisible();
        });
        await test.step('Verify password field is visible', async () => {
            await expect(loginPage['passwordLocator']).toBeVisible();
        });
        await test.step('Verify login button is visible', async () => {
            await expect(loginPage['loginButtonLocator']).toBeVisible();
        });
    });

    test('Password input is masked', async ({ page, loginPage }) => {
        await test.step('Navigate to login page', async () => {
            await page.goto('/');
        });
        await test.step('Verify password field is masked', async () => {
            const type = await loginPage['passwordLocator'].getAttribute('type');
            expect(type).toBe('password');
        });
    });

    test('Error message disappears after successful login', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        await test.step('Login with invalid credentials', async () => {
            await loginPage.login(users.invalid.username, users.invalid.password);
        });
        await test.step('Verify error message is visible', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(users.standard.username, users.standard.password);
        });
        await test.step('Verify error message is not visible', async () => {
            await expect(page.locator('[data-test="error"]')).not.toBeVisible();
        });
    });

    test('Session persistence after login', async ({ loginPage, page }) => {
        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });
        await test.step('Login with valid credentials', async () => {
            await loginPage.login(users.standard.username, users.standard.password);
        });
        await test.step('Verify navigation to inventory', async () => {
            await expect(page).toHaveURL(/.*inventory\.html/);
        });
        await test.step('Reload page and verify session persists', async () => {
            await page.reload();
            await expect(page).toHaveURL(/.*inventory\.html/);
        });
    });
});