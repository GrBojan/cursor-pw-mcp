import { test, expect } from '../fixtures';

test.describe('SauceDemo Inventory Page', () => {
    test.use({ storageState: 'setStorageState/storageStateFiles/storageState.json' });

    test('should display a list of inventory items', async ({ inventorySteps }) => {
        await inventorySteps.gotoInventoryPage();
        expect(await inventorySteps.getInventoryItemCount()).toBeGreaterThan(0);
    });

    test('should display name, description, price, and image for each item', async ({ inventorySteps }) => {
        await inventorySteps.gotoInventoryPage();
        const names = await inventorySteps.getItemNames();
        expect(names.length).toBeGreaterThan(0);
        expect(await inventorySteps.getItemDescriptions()).toHaveLength(names.length);
        expect(await inventorySteps.getItemPrices()).toHaveLength(names.length);
        const images = await inventorySteps.getItemImages();
        expect(images).toHaveLength(names.length);
        expect(images.every(Boolean)).toBeTruthy();
    });

    test('should add an item to the cart', async ({ inventorySteps }) => {
        await inventorySteps.gotoInventoryPage();
        await inventorySteps.addItemToCart(0);
        expect(await inventorySteps.getCartBadgeCount()).toBe(1);
    });

    test('should remove an item from the cart', async ({ inventorySteps }) => {
        await inventorySteps.gotoInventoryPage();
        await inventorySteps.addItemToCart(0);
        await inventorySteps.removeItemFromCart(0);
        expect(await inventorySteps.getCartBadgeCount()).toBe(0);
    });

    test('should navigate to item details page when item is clicked', async ({ inventorySteps, page }) => {
        await inventorySteps.gotoInventoryPage();
        await inventorySteps.goToItemDetails(0);
        await expect(page).toHaveURL(/.*inventory-item.*/);
    });

    test('should sort items by price low to high', async ({ inventorySteps }) => {
        await inventorySteps.gotoInventoryPage();
        await inventorySteps.sortItems('lohi');
        const prices = await inventorySteps.getItemPrices();
        const priceNumbers = prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
        const sorted = [...priceNumbers].sort((a, b) => a - b);
        expect(priceNumbers).toEqual(sorted);
    });

    test('should persist cart items after page reload', async ({ inventorySteps, page }) => {
        await inventorySteps.gotoInventoryPage();
        await inventorySteps.addItemToCart(0);
        await page.reload();
        expect(await inventorySteps.getCartBadgeCount()).toBe(1);
    });
}); 