import { test, expect } from '../fixtures';
import { users } from '../fixtures/users';

// Helper to ensure string type for Playwright login
function safeUser(user) {
    return {
        username: user.username ?? '',
        password: user.password ?? '',
    };
}

test.describe('SauceDemo Login Page', () => {
    test('Locked out user cannot login', async ({ loginPage, page, basePage }, testInfo) => {
        await test.step('Annotate browser version', async () => {
            await basePage.annotateBrowserVersion(testInfo);
        });

        await test.step('Navigate to login page', async () => {
            await loginPage.navigate('/');
        });

        await test.step('Attempt login with locked out user', async () => {
            const user = safeUser(users.locked);
            await loginPage.login(user.username, user.password);
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
            const user = safeUser(users.problem);
            await loginPage.login(user.username, user.password);
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
            const user = safeUser(users.glitch);
            const start = Date.now();
            await loginPage.login(user.username, user.password);
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
            const user = safeUser(users.invalid);
            await loginPage.login(user.username, user.password);
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
            const user = safeUser(users.empty);
            await loginPage.login(user.username, user.password);
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
            const userInvalid = safeUser(users.invalid);
            await loginPage.login(userInvalid.username, userInvalid.password);
        });
        await test.step('Verify error message is visible', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
        await test.step('Login with valid credentials', async () => {
            const userStandard = safeUser(users.standard);
            await loginPage.login(userStandard.username, userStandard.password);
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
            const userStandard = safeUser(users.standard);
            await loginPage.login(userStandard.username, userStandard.password);
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