
import {test,expect,Locator} from "@playwright/test"

test("Veriry Drop-down",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    //await expect(page).toHaveTitle("Automation Testing Practice - Atom");

    // 1) Select options from the drop down (4ways)
    // await page.locator('#country').selectOption('France') //Visible text
    // await page.locator('#country').selectOption({value:'canada'}) //By Value
    // await page.locator('#country').selectOption({label:'Germany'}) //By Label
    // await page.locator('#country').selectOption({index:8}) // By Index

    // 2) Count the no of options 
    const dropDownOptions:Locator=page.locator('//select[@id="country"]//option')
    await expect(dropDownOptions).toHaveCount(10)

    // 3) Check the option in the dropdown
    let textOptions:string[]=await (await dropDownOptions.allTextContents()).map(text=>text.trim())
    console.log(textOptions);
     expect(textOptions).toContainEqual('India');

     //4) Printing all the options
     for(const option of textOptions)
        console.log(option)

     
})