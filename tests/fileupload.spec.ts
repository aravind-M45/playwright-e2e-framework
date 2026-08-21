import { test, expect } from "@playwright/test"

test("Verify File Uploads", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");
    const fileupload = page.locator('[id="singleFileInput"]');
    await expect(fileupload).toBeVisible();
    await fileupload.setInputFiles('./tests/uploads/fileupload.json');
    await expect(fileupload).toHaveValue(/fileupload\.json/);
})

test("Verify File Download", async ({ page }) => {
    test.setTimeout(30000)
    await page.goto("https://bakkappan.github.io/Testers-Talk-Practice-Site/");
    await page.getByPlaceholder("Username").fill("TestersTalk");
    await page.getByPlaceholder("Password").fill("TestersTalk");
    await page.getByRole('button', { name: "Login" }).click();
    const [download]=await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link',{name:'Download Excel'}).click()
    ])
    console.log('Downloaded File Name: ',download.suggestedFilename());
    await download.saveAs('./download/FullCourse.xlsr')

})