import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class CheckoutPage extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly finishButton: Locator;
    private readonly confirmationMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.confirmationMessage = page.locator('.complete-header');
    }

    async fillCheckoutInfo(first: string, last: string, postal: string): Promise<void> {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.postalCodeInput.fill(postal);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async getConfirmationMessage(): Promise<string> {
        return (await this.confirmationMessage.textContent()) || '';
    }
} 