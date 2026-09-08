

import {test,expect,chromium} from "@playwright/test"

test("Handle Screenshot with in script",async ()=>{
    const browser=await chromium.launch();
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://demoblaze.com/index.html");
    

    //Capture Screen-shots
    const currentTime=Date.now();
    //await page.screenshot({path:'screenshots/'+'page1'+currentTime+'.png'})
    
    //Capture Full page Screen-shots
    //await page.screenshot({path:'screenshots/'+'fullPage'+currentTime+'.png',fullPage:true})
})

test('Config screenshot Globally',async ({page})=>{

  //Capture only on failures : set config
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('123@');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
   await page.waitForTimeout(4000);
})

test.only('Config Videos Globally',async ({page})=>{

  //Capture only on failures : set config
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123@31');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  await page.waitForTimeout(4000);

})