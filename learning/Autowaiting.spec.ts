
import {test,expect} from "@playwright/test"

test("Auto-waiting and force action",async ({page})=>{

    test.setTimeout(50000) //Local timeout

    await page.goto("https://testautomationpractice.blogspot.com/");
    const title:string=await page.title();

    // Auto-wait: Before performing the action or assertions it performs some actionability checks if its passed then it will perform actions 
    
    //Assertions - Autowait works
    //DefaultTimeout - 5sec
    await expect(page).toHaveURL("https://testautomationpractice.blogspot.com/",{timeout:1000}); //Set expect timeout
    await expect(page).toHaveTitle(title);
    
    //Actions - Autowait works
    //DefaultTimeout - 30sec
    await page.locator("span .wikipedia-search-input").fill('laptop',{force:true}); //force action(will skips the checks)
    await page.locator("input[type='submit']").click({force:true});
})