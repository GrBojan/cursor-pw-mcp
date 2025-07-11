import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class CartPage extends BasePage {
    private readonly cartItemLocator: Locator;
    private readonly removeButtonLocator: Locator;
    private readonly checkoutButtonLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.cartItemLocator = page.locator('.cart_item');
        this.removeButtonLocator = page.locator('.cart_button');
        this.checkoutButtonLocator = page.locator('[data-test="checkout"]');
    }

    async goToCartPage(): Promise<void> {
        await this.navigate('/cart.html');
    }

    async getCartItems(): Promise<Locator[]> {
        return this.cartItemLocator.all();
    }

    async removeItem(index: number): Promise<void> {
        await this.clickOnElement(this.removeButtonLocator.nth(index));
    }

    async proceedToCheckout(): Promise<void> {
        await this.clickOnElement(this.checkoutButtonLocator);
    }
} 