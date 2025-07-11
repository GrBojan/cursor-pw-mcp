import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class SignUpPage extends BasePage {
  private readonly usernameLocator: Locator;
  private readonly emailLocator: Locator;
  private readonly passwordLocator: Locator;
  private readonly signUpButtonLocator: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameLocator = page.locator('#signup-username');
    this.emailLocator = page.locator('#signup-email');
    this.passwordLocator = page.locator('#signup-password');
    this.signUpButtonLocator = page.locator('#signup');
  }

  async signUp(username: string, email: string, password: string): Promise<void> {
    await this.fillElement(this.usernameLocator, username);
    await this.fillElement(this.emailLocator, email);
    await this.fillElement(this.passwordLocator, password);
    await this.clickOnElement(this.signUpButtonLocator);
  }
} 