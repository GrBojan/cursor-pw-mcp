import { request, expect } from '@playwright/test';

export class ProductApi {
    private readonly baseUrl = 'https://fakestoreapi.com';

    async listAllProducts() {
        const context = await request.newContext({
            ignoreHTTPSErrors: true,
        });
        const response = await context.get(`${this.baseUrl}/products`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok()) {
            throw new Error(`Failed to fetch products: ${response.status()} ${response.statusText()}`);
        }
        const products = await response.json();
        console.log('Products:', products);
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBeGreaterThan(0);
        return products;
    }
} 