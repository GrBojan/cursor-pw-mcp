import { test as base } from '@playwright/test';
import { LoginPage } from './src/pages/LoginPage';
import { SignUpPage } from './src/pages/SignUpPage';
import { HomePage } from './src/pages/HomePage';
import { LoginSteps } from './src/stepDefinitions/LoginSteps';
import { SignUpSteps } from './src/stepDefinitions/SignUpSteps';
import { HomeSteps } from './src/stepDefinitions/HomeSteps';
import { InventoryPage } from './src/pages/InventoryPage';
import { InventorySteps } from './src/stepDefinitions/InventorySteps';
import { CartPage } from './src/pages/CartPage';
import { CartSteps } from './src/stepDefinitions/CartSteps';
import { CheckoutPage } from './src/pages/CheckoutPage';
import { CheckoutSteps } from './src/stepDefinitions/CheckoutSteps';
import { BasePage } from './src/pages/BasePage';

export const test = base.extend<{
  basePage: BasePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  homePage: HomePage;
  loginSteps: LoginSteps;
  signUpSteps: SignUpSteps;
  homeSteps: HomeSteps;
  inventoryPage: InventoryPage;
  inventorySteps: InventorySteps;
  cartPage: CartPage;
  cartSteps: CartSteps;
  checkoutPage: CheckoutPage;
  checkoutSteps: CheckoutSteps;
}>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  loginSteps: async ({ page }, use) => {
    const loginSteps = new LoginSteps(page);
    await use(loginSteps);
  },
  signUpSteps: async ({ page }, use) => {
    const signUpSteps = new SignUpSteps(page);
    await use(signUpSteps);
  },
  homeSteps: async ({ page }, use) => {
    const homeSteps = new HomeSteps(page);
    await use(homeSteps);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  inventorySteps: async ({ page }, use) => {
    const inventorySteps = new InventorySteps(page);
    await use(inventorySteps);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  cartSteps: async ({ page }, use) => {
    const cartSteps = new CartSteps(page);
    await use(cartSteps);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  checkoutSteps: async ({ page }, use) => {
    const checkoutSteps = new CheckoutSteps(page);
    await use(checkoutSteps);
  },
});

export { expect } from '@playwright/test'; 