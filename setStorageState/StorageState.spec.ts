import { test, expect } from '../fixtures';
import { Browser, chromium } from '@playwright/test';
import { StorageState } from '../src/pages/StorageState';

const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
};

const storagePath = 'setStorageState/storageStateFiles/storageState.json';

let browser: Browser;

// No global storage instance, since it now requires a Page

test.beforeAll(async () => {
    browser = await chromium.launch();
});

test.afterAll(async () => {
    await browser.close();
});

test('should login and save storage state', async ({ page }) => {
    const storage = new StorageState(page, storagePath);
    await storage.loginAndSave(users.standard.username, users.standard.password, '/');
    expect(require('fs').existsSync(storagePath)).toBeTruthy();
});
