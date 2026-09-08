
import {test,expect,Locator} from "@playwright/test"

test("Verify AutoSuggestDropDown",async ({page})=>{

        await page.goto("https://www.flipkart.com/");
        await page.locator("input[type='text']").fill("smart"); 
        await page.waitForTimeout(4000)

        //Get all the suggested options
        const options:Locator=page.locator("ul>li")     //CTRL+shift+p run=> emulate focused page
        const c:number=await options.count();
        console.log("Elements Count : ",c);
        expect(c).toBe(8);
        
        //Printing  
        console.log("4th Option: ",await options.nth(4).innerText()) //For Single value

        for(let i=0;i<c;i++)  //For all values
        {
            console.log(i+1,")option : ",await options.nth(i).innerText())
        }
        // 2)  let elements:string[]=await ele.allTextContents();
        // for(const e of elements)
        // {
        //     console.log(e)
        // }
        

        // Clicking the option
        for(let i=0;i<c;i++)
        {
            const txt:string=await options.nth(i).innerText();
            if(txt=='smartphone')
            {
                await options.nth(i).click();
                break;
            }
        }
})