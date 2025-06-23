import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class HomePage extends BasePage {
  private readonly logoutButtonLocator: Locator;
  private readonly welcomeMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.logoutButtonLocator = page.locator('#logout');
    this.welcomeMessageLocator = page.locator('#welcome');
  }

  async isLoggedIn(): Promise<boolean> {
    return this.logoutButtonLocator.isVisible();
  }

  async getWelcomeMessage(): Promise<string> {
    const text = await this.welcomeMessageLocator.textContent();
    return text ?? '';
  }
} 