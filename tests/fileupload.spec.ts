import { test, expect } from "@playwright/test";
import {userLogin,downloadAndValidateFile} from "../src/utils/common"

test.describe("File Upload and Download", () => {
    test("Verify File Upload", async ({ page }) => {
        await userLogin(page);
        const fileUpload = page.locator("#fileInput");
        await fileUpload.setInputFiles("./tests/uploads/fileupload.json");
        await expect(page.locator("#fileName"))
            .toHaveText("Selected: fileupload.json");
    });

    test("Verify File Download", async ({ page }) => {
        //1) Using Utils function
        await userLogin(page);
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

    test("Verify Drag and Drop",async ({page})=>{
        await page.goto("https://testautomationpractice.blogspot.com/");
        await page.getByRole('link', { name: "Download Files" }).click();
        const source = page.locator("#draggable");
        const destination = page.locator("#droppable");
        await expect(source).toHaveClass(/ui-draggable/);
        await expect(destination).toHaveClass(/ui-droppable/);
        await source.scrollIntoViewIfNeeded();
        const sourceBox = await source.boundingBox();
        const destinationBox = await destination.boundingBox();
        expect(sourceBox).not.toBeNull();
        expect(destinationBox).not.toBeNull();
            const sourceCenter = { x: sourceBox!.x + sourceBox!.width / 2, y: sourceBox!.y + sourceBox!.height / 2 };
            const destinationCenter = { x: destinationBox!.x + destinationBox!.width / 2, y: destinationBox!.y + destinationBox!.height / 2 };
            await page.mouse.move(sourceCenter.x, sourceCenter.y);
        await page.mouse.down();
            await page.mouse.move(sourceCenter.x + 10, sourceCenter.y + 10, { steps: 2 });
            await page.mouse.move(destinationCenter.x, destinationCenter.y, { steps: 20 });
        await page.mouse.up();
        await expect(destination).toHaveText("Dropped!");
    })
});