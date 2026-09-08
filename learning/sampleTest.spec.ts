

import {test,expect,Locator} from '@playwright/test'

test("Verify Highest and Lowest Prices",async ({page})=>{

    await page.goto("https://www.bstackdemo.com/")
    await page.locator("//select").selectOption({value:'highestprice'});
    await page.waitForTimeout(4000)

    const totalPrices:Locator=page.locator("//div[@class='val']//b");
     const allAmount: number[] = (await totalPrices.allTextContents())
        .map(txt => Number(txt.replace('$', '').trim()));

    console.log(allAmount);

    let s=Number.MAX_SAFE_INTEGER;
    let h=0;
    for(const amt of allAmount)
    {
        if(amt>h)
        {
            h=amt;
        }
        if(amt<s) s=amt;
    }
    
    console.log("Hightest: ",h)
    console.log("Lowest: ",s)

    expect(h).toBeGreaterThan(s);
})