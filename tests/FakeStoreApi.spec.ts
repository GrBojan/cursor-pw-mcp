import { test, expect } from '../fixtures';

test('Create user via Fake Store API and get user id', async ({ fakeApiUsers, productApi }, testInfo) => {
    
    // ✅ Skip test if running on CI
    test.skip(process.env.CI === 'true', 'Skipping this test on CI environment');

    let userId: number;

    await test.step('Create user and assert user id is a number', async () => {
        userId = await fakeApiUsers.createFakeStoreUser();
        expect(typeof userId).toBe('number');
    });

    await test.step('List all products using ProductApi', async () => {
        await productApi.listAllProducts();
        console.log(testInfo.project.name);
    });
});
