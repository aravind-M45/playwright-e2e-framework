import {test,expect} from "@playwright/test"
import { LoginPage } from "../src/pages/login.page";

test("Login with Valid Credientials",async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    const obj:LoginPage=new LoginPage(page);
    await obj.enterUName('Admin');
    await obj.enterPassword('admin123');
    await obj.clickLoginButton();
    await obj.verifyUrl();
})

test.skip("Login with InValid Credientials",async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    
    test.setTimeout(3000);
    const obj:LoginPage=new LoginPage(page);
    await obj.enterUName('Admin');
    await obj.enterPassword('admin@#123');
    await obj.clickLoginButton();
    await obj.verifyUrl();
})