
import {test,expect,Locator} from "@playwright/test"


//InputTypes
//RadioButtons
//DropDowns

test("verify playwright actions",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const inputValue:Locator=page.locator("#name")
    await inputValue.fill("Aravind");
    console.log(await inputValue.innerText());
    const act_value:string=await inputValue.inputValue()
    expect(act_value).toBe("Aravind");

    //getAttribute
    const attName:Locator=page.locator("#name");
    const attValue:string|null =await attName.getAttribute('maxlength');
    expect(attValue).toBe('15');

    await page.waitForTimeout(3000)
})

//Radio button   *only is a annotation for executing particular testcase
test("Verify radio-buttons",async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    let maleRadio:Locator=page.locator('#male');
    await expect(maleRadio).toBeVisible();
    expect(await maleRadio.isChecked()).toBe(false)

    await maleRadio.check();
    expect(maleRadio).toBeChecked();
    await page.waitForTimeout(3000)
})

//Checkboxes *only is a annotation for executing particular testcase
test.only('Verify check-boxes',async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //1) Selecting single check box--
    let sundaycheckBox:Locator=page.getByLabel('Sunday');
    //await sundaycheckBox.check();
    //expect(sundaycheckBox).toBeChecked();

    //2) Selecting multiple checkboxes using map

    let labels:string[]=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const checkBoxes:Locator[]=labels.map(index => page.getByLabel(index));
    let c:number=0;
    for(const checkBox of checkBoxes)
    {
        await checkBox.check();
        await expect(checkBox).toBeChecked();
        c++;
    }
    console.log("Total check-boxs : ",c);

    // 3) Un-checking the selected checkoxes
    for(const checkBox of checkBoxes)
    {
        checkBox.uncheck();
        await expect(checkBox).not.toBeChecked();
    }

    // 4)) Checking specific checkboxes
    c=0;
    for(const checkBox of checkBoxes)
    {
        if(c>3)
        {
            await checkBox.check();
            await expect(checkBox).toBeChecked();
        }
        c++;
    }
    await page.waitForTimeout(3000)


    // 5) if checked,UNCHECK and if unchecked,CHECK
    for(let checkBox of checkBoxes)
    {
        if(await checkBox.isChecked())
        {
            await checkBox.uncheck();
            await expect(checkBox).not.toBeChecked();
        }
        else 
        {
           await checkBox.check();
            await expect(checkBox).toBeChecked();
        }
    }
})





