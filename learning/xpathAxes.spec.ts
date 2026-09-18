import {test,expect,Locator} from "@playwright/test"

test("Verify X-path axes",async ({page})=>{

    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //Self
    const UK:Locator=page.locator("//td[.='UK']/self::td");
    await expect(UK).toHaveText("UK");
    console.log("Self : ",await UK.textContent())

    //Preceding-sibling
    const preSib:Locator=page.locator("//td[.='UK']/preceding-sibling::td[1]");
    await expect(preSib).toBeVisible();
    console.log("Pre-Sibling : ",await preSib.textContent())

    //preceding
    const fullRow:Locator=page.locator("//td[.='UK']/preceding::tr[1]");
    await expect(fullRow).toBeVisible();
    console.log("Preceding : ",await preSib.textContent())

    // Following
    const follow:Locator=page.locator("//td[text()='UK']/following::tr[1]");
    await expect(follow).toContainText("Laughing Bacchus Winecellars");
    console.log("Preceding : ",await follow.textContent())
})