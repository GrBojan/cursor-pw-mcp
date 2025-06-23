import { BasePage } from './BasePage';
import { Page, Locator } from '@playwright/test';

export class InventoryPage extends BasePage {
    private readonly itemLocator: Locator;
    private readonly itemNameLocator: Locator;
    private readonly itemDescLocator: Locator;
    private readonly itemPriceLocator: Locator;
    private readonly itemImgLocator: Locator;
    private readonly addToCartButtonLocator: Locator;
    private readonly cartBadgeLocator: Locator;
    private readonly sortDropdownLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.itemLocator = page.locator('.inventory_item');
        this.itemNameLocator = page.locator('.inventory_item_name');
        this.itemDescLocator = page.locator('.inventory_item_desc');
        this.itemPriceLocator = page.locator('.inventory_item_price');
        this.itemImgLocator = page.locator('.inventory_item img.inventory_item_img');
        this.addToCartButtonLocator = page.locator('.btn_inventory');
        this.cartBadgeLocator = page.locator('.shopping_cart_badge');
        this.sortDropdownLocator = page.locator('.product_sort_container');
    }

    async getInventoryItems(): Promise<Locator[]> {
        return this.itemLocator.all();
    }

    async getItemNames(): Promise<string[]> {
        return this.itemNameLocator.allTextContents();
    }

    async getItemDescriptions(): Promise<string[]> {
        return this.itemDescLocator.allTextContents();
    }

    async getItemPrices(): Promise<string[]> {
        return this.itemPriceLocator.allTextContents();
    }

    async getItemImages(): Promise<string[]> {
        return this.itemImgLocator.evaluateAll((imgs) =>
            imgs.map(img => img instanceof HTMLImageElement ? img.src : '')
        );
    }

    async addItemToCart(index: number): Promise<void> {
        await this.addToCartButtonLocator.nth(index).click();
    }

    async removeItemFromCart(index: number): Promise<void> {
        await this.addToCartButtonLocator.nth(index).click();
    }

    async getCartBadgeCount(): Promise<number> {
        if (await this.cartBadgeLocator.count() === 0) return 0;
        const badge = await this.cartBadgeLocator.first();
        const text = await badge.textContent();
        return text ? parseInt(text) : 0;
    }

    async goToItemDetails(index: number): Promise<void> {
        await this.itemNameLocator.nth(index).click();
    }

    async sortItems(optionValue: string): Promise<void> {
        await this.sortDropdownLocator.selectOption(optionValue);
    }
} 