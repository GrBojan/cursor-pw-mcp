import { SignUpPage } from '../pages/SignUpPage';
import { Page } from '@playwright/test';

export class SignUpSteps {
  private signUp: SignUpPage;

  constructor(page: Page) {
    this.signUp = new SignUpPage(page);
  }

  async navigateToSignUpPage(): Promise<void> {
    await this.signUp.navigate('/signup');
  }

  async signUpWithCredentials(username: string, email: string, password: string): Promise<void> {
    await this.signUp.signUp(username, email, password);
  }
} 