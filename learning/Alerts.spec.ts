// alert() confirm() prompt() 3 types of dialog
import {test,expect} from "@playwright/test"


// By default pw will handle the dialog and alerts, to handle or interact with the alert we must create an event before the action
test("Simple Dialog",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog",(dialog)=>{
        console.log(dialog.type());
        expect(dialog.type()).toBe("alert");
        console.log(dialog.message());
        expect(dialog.message()).toContain("I am an alert box!");
        dialog.accept();
    })
    await page.locator("#alertBtn").click();
    await page.waitForTimeout(3000);

})
test.only("Confirmation Dialog",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog",(dialog)=>{
        console.log(dialog.type());
        expect(dialog.type()).toBe("confirm");
        console.log(dialog.message());
        expect(dialog.message()).toContain("Press a button!");
        //dialog.accept(); //Accept 
        dialog.dismiss(); //Reject
    })
    await page.locator("#confirmBtn").click();
    const res:string=await page.locator("#demo").innerText();
    expect(res).toContain("You pressed Cancel!");
    await page.waitForTimeout(5000);

})

test.only("Prompt Dialog",async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog",(dialog)=>{
        console.log(dialog.type());
        expect(dialog.type()).toBe("prompt");
        console.log(dialog.message());
        expect(dialog.message()).toContain("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Potter");
        dialog.accept("Arvi"); //Accept 
        //dialog.dismiss(); //Reject
    })
    await page.locator("#promptBtn").click();
    const res:string=await page.locator("#demo").innerText();
    expect(res).toContain("Hello Arvi! How are you today?");
    await page.waitForTimeout(5000);

})