export async function goToInventoryPageStep(inventorySteps, test) {
    await test.step('Go to inventory page', async () => {
        await inventorySteps.gotoInventoryPage();
    });
} 