
import {test,expect,Locator} from "@playwright/test"

test("Verify Boot-strap DropDown",async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.locator("input[name$='username']").fill("Admin");
    await page.locator("input[name$='password']").fill("admin123");
    await page.locator("button[type='submit']").click();
    expect(page).toHaveTitle("OrangeHRM");

    await page.getByText("PIM").click();
    const options:Locator=page.locator("div[class='oxd-select-wrapper'] i")
    await options.nth(2).click();

    await page.waitForTimeout(3000)
    const opText:Locator=page.locator("div[role$='listbox'] span")
    console.log(await opText.count());

    for(let i=0;i<await opText.count();i++)
    {
        const txt:string=await opText.nth(i).innerText();
        console.log(txt);
        if(txt=='QA Engineer')
        {
            await opText.nth(i).click();
            expect(txt).toBe("QA Engineer");
            break;
        }
    }
})