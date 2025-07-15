# Playwright Demo Project

[![Tests](https://github.com/GrBojan/cursor-pw-mcp/actions/workflows/tests.yml/badge.svg)](https://github.com/GrBojan/cursor-pw-mcp/actions)

This project demonstrates advanced end-to-end testing with [Playwright](https://playwright.dev/) and **TypeScript** using the Page Object Model (POM), robust step definitions, storage state management, and both positive and negative user flows. The demo is based on the [SauceDemo](https://www.saucedemo.com/) sample app.

---

## Features
- **Page Object Model (POM):** Modular classes for each page (Login, Inventory, Cart, Checkout, etc.)
- **Step Definitions:** Reusable step classes for BDD-style and readable tests
- **Storage State:** Auth/session state is generated in a setup project and reused for fast, reliable tests
- **Positive & Negative Flows:** Covers both happy path and edge/negative scenarios
- **TypeScript, Playwright Test, ESLint**
- **Environment Variables:** Secure credential management for local and CI
- **CI/CD Sharding & Storage State:** Fast, scalable CI with Playwright sharding and pre-generated storage state

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
├── fixtures/            # Test data and user fixtures
│   └── users.ts
├── fixtures.ts          # Playwright custom fixtures
├── playwright.config.ts # Playwright config (projects, storage state, etc.)
├── package.json         # Scripts and dependencies
├── .env                 # Environment variables (not committed, project root)
└── README.md            # This file
```

---

## Setup & Installation

> **Requires Node.js v18 or higher**

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Install Playwright browsers:**
   ```sh
   npx playwright install --with-deps
   ```

3. **Configure environment variables:**
   - Create a `.env` file in the project root and fill in credentials:
     ```env
     TEST_USER_STANDARD=standard_user
     TEST_USER_LOCKED=locked_out_user
     TEST_USER_PROBLEM=problem_user
     TEST_USER_GLITCH=performance_glitch_user
     TEST_USER_INVALID=invalid_user
     TEST_PASS_VALID=secret_sauce
     TEST_PASS_INVALID=wrong_password
     ```
   - **Do not commit your `.env` file!**

4. **Generate storage state (login session):**
   ```sh
   npx playwright test --project=setup-storage
   ```
   This will run `setStorageState/StorageState.spec.ts` and create `setStorageState/storageStateFiles/storageState.json`.

5. **Run all tests:**
   ```sh
   npx playwright test
   ```
   - For headed mode: `npm run test:headed`
   - For headless mode: `npm run test:headless`

## How to Update Playwright and Browsers

To update Playwright and its browser binaries to the latest version, run:

```sh
npm update @playwright/test
npx playwright install --with-deps
```

This ensures you have the latest Playwright features and browser versions for testing.

---

## Usage Examples

**Run a specific test file in Chromium:**
```sh
npx playwright test tests/LoginFeatures.spec.ts --project=chromium
```

**Re-run only failed tests:**
```sh
npx playwright test --last-failed
```

**View HTML report:**
```sh
npx playwright show-report
```

**Run all tests in 8 shards in parallel (Chromium):**
```sh
npm run test:shard:all
```
This uses the script:
```json
"test:shard:all": "bash -c 'for i in 1 2 3 4 5 6 7 8; do npx playwright test --project=chromium --shard=$i/8 & done; wait'"
```
You can adjust the number of shards to match your CPU cores.

---

## How to Run or Debug a Single Test

**Run a single test file:**
```sh
npx playwright test tests/InventoryPage.spec.ts --project=chromium
```

**Run a single test by name (using -g):**
```sh
npx playwright test -g "should complete checkout flow for standard user"
```

**Debug a test (headed mode with inspector):**
```sh
npx playwright test tests/InventoryPage.spec.ts --debug
```

**Debug in VSCode:**
- Open the test file in VSCode.
- Click the "Run" or "Debug" code lens above the test or use the built-in Playwright Test extension for interactive debugging.

---

## Environment Variables
- All sensitive credentials are managed via `.env` in the project root and loaded with [dotenv](https://www.npmjs.com/package/dotenv).
- Example variables:
  - `TEST_USER_STANDARD`, `TEST_PASS_VALID`, etc.
- In CI/CD, set these as secrets/environment variables in your pipeline, or ensure the runner copies/creates the `.env` file at the project root.
- If you change the path, update the `dotenv.config({ path: '.env' })` call in your setup.

---

## Playwright MCP / Codegen
- Use [Playwright MCP](https://github.com/microsoft/playwright-mcp) for interactive code generation, robust selector analysis, and visual debugging.
- Start with:
  ```sh
  npx playwright-mcp
  ```
- Interact with your app in the browser, copy generated code, and use it in your tests or page objects.
- MCP helps you generate resilient selectors and assertions, and can be used for live debugging and network/console analysis.

---

## CI/CD
- **Optimized for GitHub Actions:**
  - **Two-stage workflow:**
    1. `setup-storage` job runs once to generate storage state (login/session) and uploads it as an artifact.
    2. Sharded jobs (`playwright-sharding-docker`) run browser tests in parallel shards, downloading and using the storage state.
    3. All test results (including setup-storage) are merged into a single Playwright HTML report.
- **Blob reporting:** Uses Playwright's blob reporter for scalable, parallel test result merging.
- **Environment variables:** Secrets are injected into `.env` in each job for secure credential management.
- **Example (simplified):**
  ```yaml
  jobs:
    setup-storage:
      runs-on: ubuntu-latest
      steps:
        - run: npx playwright test --project=setup-storage
        - uses: actions/upload-artifact@v4
          with:
            name: storage-state
            path: setStorageState/storageStateFiles/
        - uses: actions/upload-artifact@v4
          with:
            name: blob-report-setup-storage
            path: blob-report
    playwright-sharding-docker:
      needs: setup-storage
      strategy:
        matrix:
          shardIndex: [1, 2, 3, 4]
          shardTotal: [4]
      steps:
        - uses: actions/download-artifact@v4
          with:
            name: storage-state
            path: setStorageState/storageStateFiles/
        - run: npx playwright test --project=chromium --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
        - uses: actions/upload-artifact@v4
          with:
            name: blob-report-${{ matrix.shardIndex }}
            path: blob-report
    merge-reports:
      needs: [playwright-sharding-docker]
      steps:
        - uses: actions/download-artifact@v4
          with:
            pattern: blob-report-*
            merge-multiple: true
        - run: npx playwright merge-reports --reporter html ./all-blob-reports
        - uses: actions/upload-artifact@v4
          with:
            name: html-report
            path: playwright-report
  ```
- **See `.github/workflows/tests.yml` for full details.**

---

## Playwright Config Improvements
- **Conditional dependencies:**
  - Browser projects (`chromium`, `firefox`, `webkit`) depend on `setup-storage` **only locally** (not in CI), using:
    ```js
    const isCI = !!process.env.CI;
    // ...
    dependencies: isCI ? [] : ['setup-storage'],
    ```
  - This prevents redundant runs in CI but keeps local developer experience smooth.
- **Maximum parallelism:**
  - `workers: undefined` lets Playwright use all available CPU cores for fastest test execution.
- **Blob reporter:**
  - Uses Playwright's blob reporter in CI for scalable, parallel result merging.

---

## Troubleshooting
- **Tests fail due to missing credentials:** Ensure your `.env` file is present and correctly filled.
- **Storage state not working:** Re-run the storage state setup step.
- **Selectors break after UI changes:** Use Playwright MCP/codegen to regenerate robust selectors.
- **HTML report not opening:** Run `npx playwright show-report` and open the provided URL in your browser.

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
- [Playwright MCP](https://github.com/microsoft/playwright-mcp)
- [Cursor AI](https://www.cursor.so/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

ISC 

---

## About Project Creation

> **This project was created and iteratively improved in collaboration with an AI coding assistant (OpenAI GPT-4) and Cursor AI. All code, configuration, and documentation were generated or refactored based on user prompts and AI-driven suggestions, demonstrating a modern, conversational approach to software development.** 