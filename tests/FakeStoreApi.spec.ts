import { test, expect } from '../fixtures';

test('Create user via Fake Store API and get user id', async ({ fakeApiUsers, productApi }) => {
    let userId: number;

    await test.step('Create user and assert user id is a number', async () => {
        userId = await fakeApiUsers.createFakeStoreUser();
        expect(typeof userId).toBe('number');
    });

    await test.step('List all products using ProductApi', async () => {
        await productApi.listAllProducts();
    });
}); 