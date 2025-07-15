import { request } from '@playwright/test';

export class FakeApiUsers { 

    LoginUser = "LoginUser";
    Email = "LoginUser@gmail.com";
    Password = "LoginPassword";

    async createFakeStoreUser() {
        const random = Math.floor(Math.random() * 1000000);
        const payload = {
            username: `LoginUser${random}`,
            email: `LoginUser${random}@gmail.com`,
            password: 'LoginPassword'
        };
    
        const context = await request.newContext({
            ignoreHTTPSErrors: true,
        });
    
        const response = await context.post('https://fakestoreapi.com/users', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'PlaywrightTest/CI'
            },
            data: payload
        });
    
        if (!response.ok()) {
            throw new Error(`Failed to create user: ${response.status()} ${response.statusText()}`);
        }
    
        const responseJson = await response.json();
        console.log('Response   :', responseJson);
        console.log('Created user id:', responseJson.id);
        return responseJson.id;
    }

    async listAllProducts() {
        const context = await request.newContext({
            ignoreHTTPSErrors: true,
        });
        const response = await context.get('https://fakestoreapi.com/products', {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok()) {
            throw new Error(`Failed to fetch products: ${response.status()} ${response.statusText()}`);
        }
        const products = await response.json();
        console.log('Products:', products);
        return products;
    }
}

