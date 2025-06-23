import { test, expect } from '../fixtures';
import { StorageState } from '../src/pages/StorageState';
import fs from 'fs';

const users = {
    standard: { username: 'standard_user', password: 'secret_sauce' },
};

const storagePath = 'setStorageState/storageStateFiles/storageState.json';

test('should login and save storage state', async ({ page }) => {
    const storage = new StorageState(page, storagePath);
    await storage.loginAndSave(users.standard.username, users.standard.password, '/');
    expect(fs.existsSync(storagePath)).toBeTruthy();
});
