import { LoginPage } from '../pages/LoginPage';
import { Page } from '@playwright/test';

export class LoginSteps {
  private login: LoginPage;

  constructor(page: Page) {
    this.login = new LoginPage(page);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.login.navigate('/login');
  }

  async loginToAm(username: string, password: string): Promise<void> {
    await this.login.login(username, password);
  }
} 