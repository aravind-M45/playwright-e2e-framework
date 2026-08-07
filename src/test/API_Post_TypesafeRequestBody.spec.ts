import {test,expect} from "@playwright/test";
import {getPostAPIRequestBody} from "../utils/APIHelpers";
import {faker} from "@faker-js/faker";

test.use({
    baseURL:"https://restful-booker.herokuapp.com",
})

test("Typesafe POST request body",{tag:"@api"},async ({request})=>{
    const fname= faker.person.firstName();
    const lname= faker.person.lastName();
    const totalprice= faker.number.int({min:1000,max:10000});
    const APIRequestBody= await getPostAPIRequestBody(fname,lname,totalprice,true,"Breakfast","2026-06-01","2026-06-10")

    const postAPIResponse=await request.post("/booking",{data:APIRequestBody})
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");
    expect(postAPIResponse.headers()['content-type']).toContain("application/json; charset=utf-8");
    const postJSONResponse=await postAPIResponse.json();
    expect(postJSONResponse.booking).toHaveProperty("totalprice");
    expect(postJSONResponse.booking).toHaveProperty("firstname");
    expect(postJSONResponse.booking.firstname).toBe(fname);
    expect(postJSONResponse.booking.lastname).toBe(lname);
    expect(postJSONResponse.booking.totalprice).toBe(totalprice);

})
