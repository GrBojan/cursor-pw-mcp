import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class LoginPage extends BasePage {
  private readonly usernameLocator: Locator;
  private readonly passwordLocator: Locator;
  private readonly loginButtonLocator: Locator;
  private readonly errorMessageLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameLocator = page.getByRole('textbox', { name: 'Username' });
    this.passwordLocator = page.getByRole('textbox', { name: 'Password' });
    this.loginButtonLocator = page.getByRole('button', { name: 'LOGIN' });
    this.errorMessageLocator = page.locator('[data-test="error"]');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillElement(this.usernameLocator, username);
    await this.fillElement(this.passwordLocator, password);
    await this.clickOnElement(this.loginButtonLocator);
  }

  async isErrorVisible(): Promise<boolean> {
    await this.waitUntilVisible(this.errorMessageLocator);
    return this.errorMessageLocator.isVisible();
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessageLocator);
  }
} 