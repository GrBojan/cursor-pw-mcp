import { test, expect } from '../fixtures';
import { goToInventoryPage } from '../helpers/navigationHelpers';

test.describe('SauceDemo Inventory Page', () => {
    test.use({ storageState: 'setStorageState/storageStateFiles/storageState.json' });

    test('should display a list of inventory items', async ({ inventorySteps }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Check inventory item count', async () => {
            expect(await inventorySteps.getInventoryItemCount()).toBeGreaterThan(0);
        });
    });

    test('should display name, description, price, and image for each item', async ({ inventorySteps }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Check item names', async () => {
            const names = await inventorySteps.getItemNames();
            expect(names.length).toBeGreaterThan(0);
            expect(await inventorySteps.getItemDescriptions()).toHaveLength(names.length);
            expect(await inventorySteps.getItemPrices()).toHaveLength(names.length);
            const images = await inventorySteps.getItemImages();
            expect(images).toHaveLength(names.length);
            expect(images.every(Boolean)).toBeTruthy();
        });
    });

    test('should add an item to the cart', async ({ inventorySteps }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Add first item to cart', async () => {
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Check cart badge count', async () => {
            expect(await inventorySteps.getCartBadgeCount()).toBe(1);
        });
    });

    test('should remove an item from the cart', async ({ inventorySteps }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Add first item to cart', async () => {
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Remove first item from cart', async () => {
            await inventorySteps.removeItemFromCart(0);
        });
        await test.step('Check cart badge count', async () => {
            expect(await inventorySteps.getCartBadgeCount()).toBe(0);
        });
    });

    test('should navigate to item details page when item is clicked', async ({ inventorySteps, page }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Go to item details', async () => {
            await inventorySteps.goToItemDetails(0);
        });
        await test.step('Check URL for item details', async () => {
            await expect(page).toHaveURL(/.*inventory-item.*/);
        });
    });

    test('should sort items by price low to high', async ({ inventorySteps }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Sort items by price low to high', async () => {
            await inventorySteps.sortItems('lohi');
        });
        await test.step('Check sorted prices', async () => {
            const prices = await inventorySteps.getItemPrices();
            const priceNumbers = prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
            const sorted = [...priceNumbers].sort((a, b) => a - b);
            expect(priceNumbers).toEqual(sorted);
        });
    });

    test('should persist cart items after page reload', async ({ inventorySteps, page }) => {
        await goToInventoryPage(inventorySteps, test);
        await test.step('Add first item to cart', async () => {
            await inventorySteps.addItemToCart(0);
        });
        await test.step('Reload page', async () => {
            await page.reload();
        });
        await test.step('Check cart badge count', async () => {
            expect(await inventorySteps.getCartBadgeCount()).toBe(1);
        });
    });
}); 