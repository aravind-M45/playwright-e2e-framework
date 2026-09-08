
import {test,expect,Locator} from "@playwright/test"

test("Read all the data from table",async({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorecolumns:boolean=true;
    let c=0;
    
    while(hasmorecolumns)
    {
        const rows:Locator[]=await page.locator("table[id='example'] tbody tr").all();
        for(const row of rows)
        {
            c++;
            console.log(await row.innerText());
        }

        // button[aria-label="Next"]
        // button:has-text("›")

        const nextButton:Locator=page.locator('button:has-text("›")');
        const isDisabled=await nextButton.getAttribute('class')

        if(isDisabled?.includes('disabled'))
        {
            hasmorecolumns=false;
        }
        else
        {
            await nextButton.click();
        }

    }
    console.log("Total rows in the table are: ",c);
    await page.waitForTimeout(3000);
})


test("Filtering the table rows",async ({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    await page.locator("#dt-length-0").selectOption('25');
    await page.waitForTimeout(5000);
    //Option 1
    // const rows:Locator[]=await page.locator("table[id$='example'] tbody tr").all();
    // expect(rows).toHaveLength(25);
    
    // Option 2
    const rows2:Locator=page.locator("table[id$='example'] tbody tr");
    await expect(rows2).toHaveCount(25)




    // 2) option-----------------
    // await page.locator("#dt-length-0").selectOption('25');
    // let r=0;
    // const rows:Locator[]=await page.locator("table[id$='example'] tbody tr").all();
    // for(const row of rows)
    // {
    //     r++;
    //     console.log(await row.innerText());
    // }
    // console.log("Total count of rows: ",r)
})

test.only("Validate table search bar",async ({page})=>{

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const searchBar:Locator=page.locator("input[type$='search']");
    const rows = page.locator("#example tbody tr");
    await searchBar.fill("Aravind");
    const text = await rows.innerText();
  if (text.includes("No matching records found")) {
    console.log("No data found");
  } else {
    console.log("Data is found:", text);
  }

        
})