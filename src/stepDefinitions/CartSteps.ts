import { CartPage } from '../pages/CartPage';
import { Page } from '@playwright/test';

export class CartSteps {
    private cart: CartPage;

    constructor(page: Page) {
        this.cart = new CartPage(page);
    }

    async gotoCartPage(): Promise<void> {
        await this.cart.navigate('');
    }

    async getCartItemCount(): Promise<number> {
        const items = await this.cart.getCartItems();
        return items.length;
    }

    async removeItem(index: number): Promise<void> {
        await this.cart.removeItem(index);
    }

    async proceedToCheckout(): Promise<void> {
        await this.cart.proceedToCheckout();
    }
} 