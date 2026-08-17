import {test,expect} from "@playwright/test";
import {formatAPIRequest} from "../../utils/APIHelpers";

import path from "path";
import fs from "fs";
import {faker} from "@faker-js/faker";

test.use({
    baseURL:"https://restful-booker.herokuapp.com",
})

test("POST API request using dynamic file to create booking",{tag:'@api'},async({request})=>{
    const jsonPath = path.join(__dirname, "../../test-data/API_testdata/POST_DynamicDetails.json");
    const postAPIBooking = fs.readFileSync(jsonPath,"utf-8");

    const values=["Dynamic Test Data", "Playwright API testing", 4500];
    const postAPIBookingData=await formatAPIRequest(postAPIBooking,values)

    const postAPIResponse=await request.post("/booking",{data:JSON.parse(postAPIBookingData)})
    const postJSONResponse=await postAPIResponse.json();
    console.log("POST API Response: ",postJSONResponse);
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");
    expect(postAPIResponse.headers()['content-type']).toContain("application/json; charset=utf-8");
    expect(postJSONResponse.booking).toHaveProperty("totalprice");
    expect(postJSONResponse.booking).toHaveProperty("firstname");

})
test("POST API request using dynamic file to create booking using faker",{tag:'@api'},async({request})=>{
    const jsonPath = path.join(__dirname, "../../test-data/API_testdata/POST_DynamicDetails.json");
    const postAPIBooking = fs.readFileSync(jsonPath,"utf-8");

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const totalprice = faker.number.int({min:1000,max:10000});
    const values=[firstName, lastName, totalprice];
    const postAPIBookingData=await formatAPIRequest(postAPIBooking,values)

    const postAPIResponse=await request.post("/booking",{data:JSON.parse(postAPIBookingData)})
    const postJSONResponse=await postAPIResponse.json();
    console.log("POST API Response: ",postJSONResponse);
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");
    expect(postAPIResponse.headers()['content-type']).toContain("application/json; charset=utf-8");
    expect(postJSONResponse.booking).toHaveProperty("totalprice");
    expect(postJSONResponse.booking).toHaveProperty("firstname");
    expect(postJSONResponse.booking.firstname).toBe(firstName);
    expect(postJSONResponse.booking.lastname).toBe(lastName);
    expect(postJSONResponse.booking.totalprice).toBe(totalprice);

})
