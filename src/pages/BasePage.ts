import { Page, Locator } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForPageToBeLoaded() {
    await this.page.waitForLoadState('load');
  }

  /**
   * Clicks on the specified element.
   * @param element - The element to click on.
   */
  async clickOnElement(element: Locator) {
    await element.waitFor({ state: 'visible' }).then(async () => {
      await element.click();
    });
  }

  async enterValue(element: Locator, value: string) {
    await element.waitFor({ state: 'visible' }).then(async () => {
      await element.fill(value);
    });
  }

  /**
   * Waits until the specified element is visible.
   * @param element - The element to wait for.
   */
  async waitUntilVisible(element: Locator) {
    await element.waitFor({ state: 'visible' }).then(async () => {
      await element.isVisible();
    });
    await this.page.waitForLoadState();
  }

  async annotateBrowserVersion(testInfo: any) {
    const browserVersion = await this.page.context().browser()?.version();
    testInfo.annotations.push({
      type: 'browser version',
      description: browserVersion,
    });
  }

  /**
   * Fills the specified element with text.
   * @param element - The element to fill.
   * @param text - The text to enter.
   */
  async fillElement(element: Locator, text: string) {
    await element.waitFor({state: 'visible'});
    await element.fill(text);
  }

  /**
   * Gets the text content of the specified element.
   * @param element - The element to get text from.
   */
  async getText(element: Locator): Promise<string> {
    await element.waitFor({state: 'visible'});
    return (await element.textContent()) ?? '';
  }

  /**
   * Checks if the specified element is visible.
   * @param element - The element to check visibility for.
   */
  async isVisible(element: Locator): Promise<boolean> {
    await element.waitFor({ state: 'visible' });
    return element.isVisible();
  }
} 