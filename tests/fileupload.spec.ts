import { test, expect } from "@playwright/test";
import {userLogin,downloadAndValidateFile} from "../src/utils/common"

test.describe("File Upload and Download", () => {
    // test.beforeEach("User Login",async ({ page }) => {
    //    await userLogin(page);
    // });

    test("Verify File Upload", async ({ page }) => {
        const fileUpload = page.locator("#fileInput");
        await fileUpload.setInputFiles("./tests/uploads/fileupload.json");
        await expect(page.locator("#fileName"))
            .toHaveText("Selected: fileupload.json");
    });

    test("Verify File Download", async ({ page }) => {
        //1) Using Utils function
        await downloadAndValidateFile(page,'Download Excel','FullCourse.xlsx')
        await downloadAndValidateFile(page,'Download Word','FullCourse.xlsx')
        await downloadAndValidateFile(page,'Download PDF','FullCourse.xlsx')
        await downloadAndValidateFile(page,'Download XML','FullCourse.xlsx')
        //2) Using Normal approach
        /*const [download] = await Promise.all([
            page.waitForEvent("download"),
            page.getByRole("link", { name: "Download Excel" }).click()
        ]);
        console.log("Downloaded File Name:",download.suggestedFilename());
        await download.saveAs("./download/FullCourse.xlsx");*/
    });

    test("Verify Multiple File Uploads",async ({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.getByRole('link', { name: "Download Files" }).click();
        await expect(page.getByText("Upload Files")).toBeVisible();
        const fileInput = page.locator("#multipleFilesInput")
        await fileInput.setInputFiles([
        "tests/uploads/fileupload.json",
        "tests/uploads/Bottle.jpg"
    ])
        await page.getByRole('button', { name: "Upload Multiple Files" }).click();
        await expect(page.getByText('Multiple files selected:')).toBeVisible();
        await page.waitForTimeout(4000)
    })
});