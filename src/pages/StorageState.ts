import { Page, Browser, BrowserContext } from '@playwright/test';
import fs from 'fs';
import { BasePage } from './BasePage';

export class StorageState extends BasePage {
    private storagePath: string;

    constructor(page: Page, storagePath: string = 'storageState.json') {
        super(page);
        this.storagePath = storagePath;
    }

    async save() {
        const state = await this.page.context().storageState();
        fs.writeFileSync(this.storagePath, JSON.stringify(state, null, 2));
    }

    async newContextWithStorage(browser: Browser): Promise<BrowserContext> {
        return await browser.newContext({ storageState: this.storagePath });
    }

    async loginAndSave(username: string, password: string, loginUrl: string = '/') {
        await this.navigate(loginUrl);
        await this.fillElement(this.page.locator('#user-name'), username);
        await this.fillElement(this.page.locator('#password'), password);
        await this.clickOnElement(this.page.locator('#login-button'));
        await this.page.waitForURL('**/inventory.html');
        await this.save();
    }
} 