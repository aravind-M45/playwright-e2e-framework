import {test,expect,Page} from "@playwright/test"

export async function userLogin(page:Page) {
    await page.goto("https://bakkappan.github.io/Testers-Talk-Practice-Site/");
    await page.getByPlaceholder("Username").fill("TestersTalk");
    await page.getByPlaceholder("Password").fill("TestersTalk");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator("#welcomeMsg")).toBeVisible();
}
export async function downloadAndValidateFile(page:Page,button:string,fileName:string){
    const [download]=await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('link',{name:button}).click()
    ])
    console.log("Downloaded FileName: "+download.suggestedFilename())
    if(download.suggestedFilename().includes('.xlsx'))
        await download.saveAs('./download/FullCourse.xlsx')
    else if(download.suggestedFilename().includes('.docx'))
        await download.saveAs('./download/FullCourse.docx')
    else if(download.suggestedFilename().includes('.xml'))
        await download.saveAs('./download/FullCourse.xml')
    else if(download.suggestedFilename().includes('.pdf'))
        await download.saveAs('./download/FullCourse.pdf')
}