import {test,expect} from "@playwright/test"

test.describe("VALIDATE API CALL",()=>{
    test("Sample GET request validation",async ({request})=>{  
        const response=await request.get("https://demoqa.com/automation-practice-form") 
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const res=await request.get("https://jsonplaceholder.typicode.com/posts/1")
        expect(res.ok()).toBeTruthy();
        expect(res.status()).toBe(200);
        console.log(await res.json())
    })

})