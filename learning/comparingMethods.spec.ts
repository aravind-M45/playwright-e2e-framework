
import { test, expect, Locator } from "@playwright/test"
import path from "path"

test("Verify Methods", async ({ page }) => {

    await page.goto("https://automationexercise.com/")
    let products: Locator = page.locator(".features_items p"); //only traditional loop used
    //console.log("All textContent() :",await products.allTextContents()); //prints all spaces,extra content
    //console.log("All innerText() :",await products.allInnerTexts());    //only prints the plane text

    //1) For Of loop for Locator: We cannot use for of loop directly for locator type instead

    /* let allProducts:Locator[]=await products.all();
     for(let proText of allProducts)
     {
         console.log(await proText.innerText());
     }*/

    //2) For in loop
    let allProducts: Locator[] = await products.all();

    for (let i in allProducts) {
        console.log(await allProducts[i].innerText());
    }
})

test("Verify File Upload in the Automation Practise site", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByRole('link', { name: "Download Files" }).click();
    await expect(page.getByText("Upload Files")).toBeVisible();
    const fileInput = page.locator("#singleFileInput")
    await fileInput.setInputFiles("learning/uploads/fileupload.json")
    await page.getByRole('button', { name: "Upload Single File" }).click();
    await expect(page.locator('[id="singleFileStatus"]')).toHaveText(/Single file selected/i)
})

test("Verify Text File Download", async ({ page }) => {

    test.setTimeout(30000);
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.getByRole('link', { name: "Download Files" }).click();
    await page
        .getByRole('textbox', { name: 'Enter Text:' })
        .fill("ValidateFileDownloaded");
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator('button').filter({ hasText: 'Download PDF File' }).last()
    ]);
    await download.saveAs("./download/FileDownload.txt");
});
