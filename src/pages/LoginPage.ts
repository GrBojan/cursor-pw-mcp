import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly usernameLocator: Locator;
  private readonly passwordLocator: Locator;
  private readonly loginButtonLocator: Locator;
  private readonly errorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameLocator = page.locator('#user-name');
    this.passwordLocator = page.locator('#password');
    this.loginButtonLocator = page.locator('#login-button');
    this.errorMessageLocator = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameLocator.fill(username);
    await this.passwordLocator.fill(password);
    await this.loginButtonLocator.click();
  }

  async isErrorVisible(): Promise<boolean> {
    return this.errorMessageLocator.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return (await this.errorMessageLocator.textContent()) ?? '';
  }
} 