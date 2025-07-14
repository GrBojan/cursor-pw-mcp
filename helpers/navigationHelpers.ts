export async function goToInventoryPage(inventorySteps, test) {
    await test.step('Go to inventory page', async () => {
        await inventorySteps.gotoInventoryPage();
    });
}

export async function goToCartPage(cartSteps, test) {
    await test.step('Go to cart page', async () => {
        await cartSteps.gotoCartPage();
    });
}

export async function goToLoginPage(loginSteps, test) {
    await test.step('Go to login page', async () => {
        await loginSteps.navigateToLoginPage();
    });
}

export async function goToCheckoutPage(checkoutSteps, test) {
    await test.step('Go to checkout page', async () => {
        await checkoutSteps.gotoCheckoutPage();
    });
} 