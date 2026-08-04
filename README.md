# Playwright E2E Practice

End-to-end test automation suite built with [Playwright](https://playwright.dev/) and TypeScript, covering key workflows of the application (login, price lists, customers, items, etc.).

---

## 🧰 Tech Stack

| Purpose                  | Tool / Library                                      |
|---------------------------|------------------------------------------------------|
| Test runner                | [`@playwright/test`](https://playwright.dev/)       |
| Language                   | TypeScript                                          |
| Test reporting              | [Allure Report](https://allurereport.org/) (`allure-playwright`, `allure-commandline`) |
| Unique/random test data     | [`@faker-js/faker`](https://fakerjs.dev/)          |
| Environment variables       | [`dotenv`](https://www.npmjs.com/package/dotenv)   |
| Excel file handling         | [`xlsx`](https://www.npmjs.com/package/xlsx)       |
| CSV file handling           | [`csv-parse`](https://www.npmjs.com/package/csv-parse) |

---

## ✅ Prerequisites

Before setting up the project, make sure you have:

- [Node.js](https://nodejs.org/) v18 or later (v20+ recommended)
- npm (comes bundled with Node.js)
- Git

Check your versions:

```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aravind-M45/Playwright-E2E-Practice.git
cd Playwright-E2E-Practice
```

### 2. Install project dependencies

This installs everything already listed in `package.json` (Playwright, TypeScript types, Allure, dotenv, xlsx, csv-parse):

```bash
npm install
```

### 3. Install Playwright browsers

Playwright needs its own browser binaries (Chromium, Firefox, WebKit) — this is a one-time setup step:

```bash
npx playwright install
```

> On Linux, you may also need OS-level dependencies:
> ```bash
> npx playwright install --with-deps
> ```

### 4. Install Faker (for unique/random test data)

Faker is used across the tests to generate unique names (e.g. price list names) so tests can be re-run without hitting "duplicate name" errors:

```bash
npm install --save-dev @faker-js/faker
```

> If it's already listed in `package.json`, `npm install` in step 2 will have installed it automatically — this step is only needed if you're adding it fresh.

### 5. Install Allure command-line (for HTML reports)

Allure report generation and viewing require the Allure CLI. It's already listed as a dev dependency, but you also need the Allure CLI available globally if you want to run `allure` commands directly (optional, since `npx allure` works without a global install):

```bash
npm install -g allure-commandline --save-dev
```

> If you'd rather not install anything globally, you can always run it via `npx allure ...` instead — see [Test Reports](#-test-reports) below.

---

## 🔑 Environment Variables

This project uses `dotenv` to manage credentials/config without hardcoding them.

1. Create a `.env` file in the project root:

```bash
touch .env
```

2. Add the required variables (adjust names to match what your `page` objects/tests read from `process.env`):

```env
DIGIT_EMAIL=your-test-email@example.com
DIGIT_PASSWORD=your-test-password
```

> ⚠️ **Never commit your `.env` file.** Make sure it's listed in `.gitignore` (it should already be there).

---

## 📂 Project Structure

```
Playwright-E2E-Practice/
├── src/
│   └── ...                # Page Object Model classes, helpers, utilities
├── tests/
│   └── ...                # Test spec files (*.spec.ts)
├── codegen.spec.ts        # Scratch file used with Playwright Codegen
├── playwright.config.ts   # Playwright configuration (browsers, reporters, baseURL, etc.)
├── tsconfig.json          # TypeScript configuration
├── package.json
└── .env                   # Local environment variables (not committed)
```

---

## ▶️ Running Tests

Run the full test suite (headless, all configured browsers):

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/digitPricelist.spec.ts
```

Run tests in headed mode (see the browser while it runs):

```bash
npx playwright test --headed
```

Run in UI mode (interactive test runner, great for debugging):

```bash
npx playwright test --ui
```

Run a single test by name:

```bash
npx playwright test -g "Price List"
```

Debug a test step-by-step:

```bash
npx playwright test --debug
```

---

## 📊 Test Reports

This project uses **Allure Report** for rich, interactive HTML test reports (test steps, screenshots, timelines, trends, etc.).

### 1. Run your tests with the Allure reporter enabled

Make sure `playwright.config.ts` includes the Allure reporter, e.g.:

```ts
reporter: [['line'], ['allure-playwright']]
```

Then run tests as usual:

```bash
npx playwright test
```

This generates raw result files in an `allure-results/` folder.

### 2. Generate the HTML report

```bash
npx allure generate allure-results --clean -o allure-report
```

### 3. Open the report in your browser

```bash
npx allure open allure-report
```

Alternatively, combine generate + open in one step:

```bash
npx allure serve allure-results
```

> `allure serve` is convenient for local runs — it generates a temporary report and opens it automatically without saving `allure-report/` to disk.

Playwright's own built-in HTML report is also available if needed:

```bash
npx playwright show-report
```

---

## 🎲 Unique Test Data with Faker

Some workflows (e.g. creating a Price List) require **unique names** on every run — reusing the same hardcoded name causes failures on re-run (e.g. duplicate-name/publish errors).

We use `@faker-js/faker` to generate a unique value once per test and reuse it everywhere that value is needed (creation + assertion):

```typescript
import { faker } from "@faker-js/faker";

const priceListName = `Test_Pricelist_${faker.string.alphanumeric(4)}`;

// Use in creation
await page.getByRole('textbox', { name: /Name/i }).fill(priceListName);

// Reuse the SAME variable in assertions later — do not call faker again
await expect(page.locator('p').filter({ hasText: priceListName })).toBeVisible();
```

> ⚠️ **Important:** Always generate the Faker value **once** into a variable and reuse that variable. Calling `faker.string.alphanumeric(4)` (or any Faker method) more than once produces different random values each time, which will break assertions that expect the originally created name.

---

## 🧹 Useful Commands Cheat Sheet

| Command                                             | Description                                  |
|------------------------------------------------------|-----------------------------------------------|
| `npm install`                                         | Install all project dependencies              |
| `npx playwright install`                              | Install Playwright browser binaries           |
| `npx playwright test`                                 | Run all tests                                 |
| `npx playwright test --headed`                        | Run tests with browser UI visible             |
| `npx playwright test --ui`                            | Open interactive test runner                  |
| `npx playwright codegen <url>`                        | Record actions and generate test code         |
| `npx allure generate allure-results --clean -o allure-report` | Generate Allure HTML report          |
| `npx allure open allure-report`                       | Open the generated Allure report              |
| `npx allure serve allure-results`                     | Generate + open report in one step            |

---

## 🤝 Contributing

1. Create a new branch for your feature/fix: `git checkout -b feature/my-change`
2. Make your changes and ensure tests pass locally
3. Commit with a clear message and push
4. Open a Pull Request

---

## 📄 License

ISC