import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async click(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async type(selector: string, text: string): Promise<void> {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async waitForSelector(selector: string, options?: Parameters<Page['waitForSelector']>[1]): Promise<Locator> {
    if (options) {
      await this.page.waitForSelector(selector, options);
    } else {
      await this.page.waitForSelector(selector);
    }
    return this.page.locator(selector);
  }

  async annotateBrowserVersion(testInfo: any) {
    const browserVersion = await this.page.context().browser()?.version();
    testInfo.annotations.push({
      type: 'browser version',
      description: browserVersion,
    });
  }
} 