import { HomePage } from '../pages/HomePage';
import { Page } from '@playwright/test';

export class HomeSteps {
  private home: HomePage;

  constructor(page: Page) {
    this.home = new HomePage(page);
  }

  async navigateToHomePage(): Promise<void> {
    await this.home.navigate('/home');
  }

  async checkIfLoggedIn(): Promise<boolean> {
    return this.home.isLoggedIn();
  }

  async getWelcomeMessage(): Promise<string> {
    return this.home.getWelcomeMessage();
  }
} 