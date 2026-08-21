import { test, expect } from "@playwright/test";

test.describe("File Upload and Download", () => {

    test.beforeEach("User Login",async ({ page }) => {
        await page.goto(
            "https://bakkappan.github.io/Testers-Talk-Practice-Site/"
        );
        await page.getByPlaceholder("Username").fill("TestersTalk");
        await page.getByPlaceholder("Password").fill("TestersTalk");
        await page.getByRole("button", { name: "Login" }).click();
        await expect(page.locator("#welcomeMsg")).toBeVisible();
    });

    test("Verify File Upload", async ({ page }) => {
        const fileUpload = page.locator("#fileInput");
        await fileUpload.setInputFiles(
            "./tests/uploads/fileupload.json"
        );
        await expect(page.locator("#fileName"))
            .toHaveText("Selected: fileupload.json");
    });

    test("Verify File Download", async ({ page }) => {
        const [download] = await Promise.all([
            page.waitForEvent("download"),
            page.getByRole("link", { name: "Download Excel" }).click()
        ]);
        console.log("Downloaded File Name:",download.suggestedFilename());
        await download.saveAs("./download/FullCourse.xlsx");
    });
});