
import {test,expect} from "@playwright/test"


/* 1) Add tags directly to the Test ID 
               use  ->    npx playwright test tagging.spec.ts --grep '@sanity'            

test("@sanity @regression Verify Facebook Title",async ({page})=>{

    await page.goto("https://www.facebook.com/");
    await expect(page).toHaveTitle('Facebook');
    console.log('Sanity Test');

})
test("@regression Verify Facebook Title",async ({page})=>{

    await page.goto("https://www.facebook.com/");
    await expect(page).toHaveTitle('Facebook');
    console.log('Regression Test')

})
*/




// 2) define tags using the paramenter
test("Verify Page Title",{tag:'@sanity'},async ({page})=>{
    await page.goto("https://www.facebook.com/");
    await expect(page).toHaveTitle('Facebook');
    console.log('Sanity Test')

})
test("Verify Facebook page Title",{tag:'@regression'},async ({page})=>{

    await page.goto("https://www.facebook.com/");
    await expect(page).toHaveTitle('Facebook');
    console.log('Regression Test')
})

/*  Following are the regular expression for executing the tag tests
    (?=.*@sanity)
    (?=.*@regression)
    (?=.*@sanity)(?=.*@regression)  // in terminal
    npx playwright test tagging.spec.ts --grep '(?=.*@sanity)(?=.*@regression)' 
    npx playwright test tagging.spec.ts --grep '@sanity' --grep-invert '@regression' invert will avoid tags
*/
test("Click Sign up button",{tag:['@regression','@sanity']},async ({page})=>{
    await page.goto("https://www.facebook.com/");
    await page.getByText('Sign up').click();
    console.log('Both Sanity and Regression Test')
})


/* 3) Config the tag in the playwright.config.ts
            tags
            grep:/@sanity/,
            grepInvert:/@regression/,
*/              
