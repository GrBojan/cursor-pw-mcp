import { CheckoutPage } from '../pages/CheckoutPage';
import { Page } from '@playwright/test';

export class CheckoutSteps {
    private checkout: CheckoutPage;

    constructor(page: Page) {
        this.checkout = new CheckoutPage(page);
    }

    async fillCheckoutInfo(first: string, last: string, postal: string): Promise<void> {
        await this.checkout.fillCheckoutInfo(first, last, postal);
    }

    async continue(): Promise<void> {
        await this.checkout.continue();
    }

    async finish(): Promise<void> {
        await this.checkout.finish();
    }

    async getConfirmationMessage(): Promise<string> {
        return this.checkout.getConfirmationMessage();
    }

    async gotoCheckoutPage(): Promise<void> {
        await this.checkout.navigate('/checkout-step-one.html');
    }
} 