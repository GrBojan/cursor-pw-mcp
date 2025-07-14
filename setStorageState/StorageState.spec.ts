import { test, expect } from '../fixtures';
import { StorageState } from '../src/pages/StorageState';
import { users } from '../fixtures/users';
import fs from 'fs';

const storagePath = 'setStorageState/storageStateFiles/storageState.json';

test('should login and save storage state', async ({ page }, testInfo) => {
    const storage = new StorageState(page, storagePath);
    await test.step('Login and save storage state', async () => {
        await storage.loginAndSave(users.standard.username ?? '', users.standard.password ?? '', '/');
    });
    await test.step('Check that storage state file exists', async () => {
        expect(fs.existsSync(storagePath)).toBeTruthy();
    });
});
