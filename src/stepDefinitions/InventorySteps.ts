import { InventoryPage } from '../pages/InventoryPage';
import { Page } from '@playwright/test';
import { expect } from '../../fixtures';

export class InventorySteps {
    private inventory: InventoryPage;

    constructor(page: Page) {
        this.inventory = new InventoryPage(page);
    }

    async gotoInventoryPage(): Promise<void> {
        await this.inventory.navigate('/inventory.html');
    }

    async getInventoryItemCount(): Promise<number> {
        const items = await this.inventory.getInventoryItems();
        return items.length;
    }

    async getItemNames(): Promise<string[]> {
        return this.inventory.getItemNames();
    }

    async getItemDescriptions(): Promise<string[]> {
        return this.inventory.getItemDescriptions();
    }

    async getItemPrices(): Promise<string[]> {
        return this.inventory.getItemPrices();
    }

    async getItemImages(): Promise<string[]> {
        return this.inventory.getItemImages();
    }

    async addItemToCart(index: number): Promise<void> {
        await this.inventory.addItemToCart(index);
    }

    async removeItemFromCart(index: number): Promise<void> {
        await this.inventory.removeItemFromCart(index);
    }

    async getCartBadgeCount(): Promise<number> {
        return this.inventory.getCartBadgeCount();
    }

    async goToItemDetails(index: number): Promise<void> {
        await this.inventory.goToItemDetails(index);
    }

    async sortItems(optionValue: string): Promise<void> {
        await this.inventory.sortItems(optionValue);
    }

    async assertAllInventoryItemFieldsPresent() {
        const names = await this.getItemNames();
        expect(names.length).toBeGreaterThan(0);
        expect(await this.getItemDescriptions()).toHaveLength(names.length);
        expect(await this.getItemPrices()).toHaveLength(names.length);
        const images = await this.getItemImages();
        expect(images).toHaveLength(names.length);
        expect(images.every(Boolean)).toBeTruthy();
    }

    async assertItemsSortedByPriceLowToHigh() {
        const prices = await this.getItemPrices();
        const priceNumbers = prices.map(p => parseFloat(p.replace(/[^\d.]/g, '')));
        const sorted = [...priceNumbers].sort((a, b) => a - b);
        expect(priceNumbers).toEqual(sorted);
    }
} 