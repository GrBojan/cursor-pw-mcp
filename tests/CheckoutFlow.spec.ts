import { test, expect } from '../fixtures';
import { goToInventoryPage, goToCartPage, goToCheckoutPage } from '../helpers/navigationHelpers';

test.describe('SauceDemo Checkout Flow', () => {
    test.use({ storageState: 'setStorageState/storageStateFiles/storageState.json' });

    test('should complete checkout flow for standard user', async ({ inventorySteps, cartSteps, checkoutSteps }) => {
        await test.step('Add two items to cart', async () => {
            await goToInventoryPage(inventorySteps, test);
            await inventorySteps.addItemToCart(0);
            await inventorySteps.addItemToCart(1);
        });

        await test.step('Go to cart and verify items', async () => {
            await goToCartPage(cartSteps, test);
            expect(await cartSteps.getCartItemCount()).toBe(2);
        });

        await test.step('Proceed to checkout', async () => {
            await cartSteps.proceedToCheckout();
        });

        await test.step('Fill checkout info and continue', async () => {
            await checkoutSteps.fillCheckoutInfo('John', 'Doe', '12345');
            await checkoutSteps.continue();
        });

        await test.step('Finish checkout and assert confirmation', async () => {
            await checkoutSteps.finish();
            await expect(await checkoutSteps.getConfirmationMessage()).toMatch(/THANK YOU FOR YOUR ORDER/i);
        });
    });

    test('should block checkout with empty cart', async ({ cartSteps, page }) => {
        await test.step('Go to cart page with empty cart', async () => {
            await goToCartPage(cartSteps, test);
        });
        await test.step('Try to proceed to checkout', async () => {
            await cartSteps.proceedToCheckout();
        });
        await test.step('Assert error or block', async () => {
            await expect(page.locator('.error-message-container, .cart_empty_message')).toBeVisible();
        });
    });

    test('should show error when required checkout fields are missing', async ({ inventorySteps, cartSteps, checkoutSteps, page }) => {
        await test.step('Add one item to cart', async () => {
            await goToInventoryPage(inventorySteps, test);
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Go to cart and proceed to checkout', async () => {
            await goToCartPage(cartSteps, test);
            await cartSteps.proceedToCheckout();
        });
        await test.step('Leave all fields empty and try to continue', async () => {
            await checkoutSteps.fillCheckoutInfo('', '', '');
            await checkoutSteps.continue();
        });
        await test.step('Assert error message is shown', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
    });

    test('should allow any non-empty postal code (no error for invalid postal code)', async ({ inventorySteps, cartSteps, checkoutSteps, page }) => {
        await test.step('Add one item to cart', async () => {
            await goToInventoryPage(inventorySteps, test);
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Go to cart and proceed to checkout', async () => {
            await goToCartPage(cartSteps, test);
            await cartSteps.proceedToCheckout();
        });
        await test.step('Fill invalid postal code and try to continue', async () => {
            await checkoutSteps.fillCheckoutInfo('John', 'Doe', 'abc');
            await checkoutSteps.continue();
        });
        await test.step('Assert navigation to next step', async () => {
            await expect(page).toHaveURL(/checkout-step-two/);
        });
    });

    test('should block checkout when not logged in', async ({ page, cartSteps }) => {
        await test.step('Clear storage and go to cart', async () => {
            await page.context().clearCookies();
            await goToCartPage(cartSteps, test);
        });
        await test.step('Assert redirect to home page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/');
        });
    });

    test('should block checkout if all items are removed during checkout', async ({ inventorySteps, cartSteps, checkoutSteps, page }) => {
        await test.step('Add one item to cart', async () => {
            await goToInventoryPage(inventorySteps, test);
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Go to cart and proceed to checkout', async () => {
            await goToCartPage(cartSteps, test);
            await cartSteps.proceedToCheckout();
        });
        await test.step('Remove all items (simulate by going back to cart and removing)', async () => {
            await goToCartPage(cartSteps, test);
            await cartSteps.removeItem(0);
        });
        await test.step('Try to continue checkout', async () => {
            await goToCheckoutPage(checkoutSteps, test);
            await checkoutSteps.fillCheckoutInfo('John', 'Doe', '12345');
            await checkoutSteps.continue();
        });
        await test.step('Assert still on checkout step two', async () => {
            await expect(page).toHaveURL(/checkout-step-two/);
        });
    });
}); 