import dotenv from 'dotenv';
dotenv.config();

import { test as base } from '@playwright/test';
import { LoginPage } from './src/pages/LoginPage';
import { InventoryPage } from './src/pages/InventoryPage';
import { LoginSteps } from './src/stepDefinitions/LoginSteps';
import { InventorySteps } from './src/stepDefinitions/InventorySteps';
import { CartPage } from './src/pages/CartPage';
import { CartSteps } from './src/stepDefinitions/CartSteps';
import { CheckoutPage } from './src/pages/CheckoutPage';
import { CheckoutSteps } from './src/stepDefinitions/CheckoutSteps';
import { BasePage } from './src/pages/BasePage';
import { FakeApiUsers } from './src/apiCalls/FakeApiUsers';
import { ProductApi } from './src/apiCalls/ProductApi';

export const test = base.extend<{
  basePage: BasePage;
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  loginSteps: LoginSteps;
  inventorySteps: InventorySteps;
  cartPage: CartPage;
  cartSteps: CartSteps;
  checkoutPage: CheckoutPage;
  checkoutSteps: CheckoutSteps;
  fakeApiUsers: FakeApiUsers;
  productApi: ProductApi;
}>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  loginSteps: async ({ page }, use) => {
    const loginSteps = new LoginSteps(page);
    await use(loginSteps);
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
  fakeApiUsers: async ({ }, use) => {
    const fakeApiUsers = new FakeApiUsers();
    await use(fakeApiUsers);
  },
  productApi: async ({ }, use) => {
    const productApi = new ProductApi();
    await use(productApi);
  },
});

export { expect } from '@playwright/test'; 