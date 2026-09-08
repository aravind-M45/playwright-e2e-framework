import { test, expect, Locator } from "@playwright/test";

test("Verify page locators", async ({ page }) => {

  // 1) getByAltText() => locating images
  await page.goto("https://demo.nopcommerce.com/");
  const image: Locator = page.getByAltText("Picture for category Electronics");
  await expect(image).toBeVisible();

  // 2) getByText() => for non-interactive elements like h, p, div, span etc
  const heading: Locator = page.getByText("Featured products");
  await expect(heading).toBeVisible();

  // 3) getByRole() => for all interactive elements
  await page.goto("https://demo.nopcommerce.com/register");
  await expect(page.getByRole("heading", { name: "Your Personal Details" })).toBeVisible();

  // 4) getByLabel() => locating form labels
  await page.getByLabel(/First name/i).fill("Aravind"); //=>/*/i call regex match
  await page.getByLabel(/Last name/i).fill("QA");
  await page.getByLabel(/Email/i).fill("aravindmyathar@gmail.com");
});
