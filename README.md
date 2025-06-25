# Playwright Demo Project

This project is created using **Playwright/TypeScript**, **Playwright MCP**, and **Cursor AI**. It demonstrates advanced end-to-end testing with [Playwright](https://playwright.dev/) using the Page Object Model (POM), step definitions, storage state management, and both positive and negative user flows. The demo is based on the [SauceDemo](https://www.saucedemo.com/) sample app.

**Cursor AI** was used to created project from scratch, no line of code was writen, ju fine tuned promts.  **Playwright MCP** was used to define locators and application behaviour. 

---

## Features
- **Page Object Model (POM):** Modular classes for each page (Login, Inventory, Cart, Checkout, etc.)
- **Step Definitions:** Reusable step classes for BDD-style and readable tests
- **Storage State:** Auth/session state is generated in a setup project and reused for fast, reliable tests
- **Positive & Negative Flows:** Covers both happy path and edge/negative scenarios
- **TypeScript, Playwright Test, ESLint**

---

## Project Structure

```
├── src/
│   ├── pages/           # Page Object Model classes
│   └── stepDefinitions/ # Step classes wrapping POMs
├── setStorageState/     # Storage state setup project
│   ├── StorageState.spec.ts
│   └── storageStateFiles/
│       └── storageState.json
├── tests/               # Main test specs (UI flows)
│   ├── CheckoutFlow.spec.ts
│   ├── InventoryPage.spec.ts
│   └── LoginFeatures.spec.ts
├── fixtures.ts          # Playwright custom fixtures
├── playwright.config.ts # Playwright config (projects, storage state, etc.)
├── package.json         # Scripts and dependencies
└── README.md            # This file
```

---

## Setup & Installation

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Generate storage state (login session):**
   ```sh
   npx playwright test --project=setup-storage
   ```
   This will run `setStorageState/StorageState.spec.ts` and create `setStorageState/storageStateFiles/storageState.json`.

3. **Run all tests:**
   ```sh
   npx playwright test
   ```
   - For headed mode: `npm run test:headed`
   - For headless mode: `npm run test:headless`

---

## How It Works

- **Storage State:**
  - The `setup-storage` project logs in and saves the session to a JSON file.
  - All other tests use this file for authenticated sessions (no need to log in every test).
- **POM & Steps:**
  - Each page (Login, Inventory, Cart, Checkout, etc.) has a POM class in `src/pages/`.
  - Each user flow is abstracted into a step class in `src/stepDefinitions/`.
  - Tests use only step classes for clarity and maintainability.
- **Test Coverage:**
  - Positive flows: login, add to cart, checkout, payment, confirmation
  - Negative flows: empty cart, missing fields, invalid data, not logged in, etc.

---

## Example Test Output

```
> npx playwright test

Running 10 tests using 5 workers

✓ Checkout Flow › should complete checkout flow for standard user
✓ Checkout Flow › should block checkout with empty cart
✓ ...

All tests passed!
```

---

## Adding New Pages, Steps, or Tests
- Add a new POM class to `src/pages/`
- Add a new step class to `src/stepDefinitions/`
- Register the new step/page in `fixtures.ts`
- Write your test in `tests/` using only step classes

---

## Technologies Used
- [Playwright Test](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Playwright MCP](https://learn.microsoft.com/en-us/azure/playwright-mcp/)
- [Cursor AI](https://www.cursor.so/)

---

## License

ISC 