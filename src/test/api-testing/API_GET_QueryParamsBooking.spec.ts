
import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import {getPostAPIRequestBody} from "../../utils/APIHelpers";

test.use({
    baseURL: "https://restful-booker.herokuapp.com",
})

test("Query Params: Verify GET request with query parameters",{tag:"@api"}, async ({ request }) => {
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const totalprice = faker.number.int({ min: 1000, max: 10000 });

    const APIRequestBody = await getPostAPIRequestBody(fname, lname, totalprice, true, "Breakfast", "2026-06-01", "2026-06-10");
    const postAPIResponse=await request.post("/booking",{data:APIRequestBody})
    const postJSONResponse=await postAPIResponse.json();
    console.log("POST API JSON Response:",postJSONResponse);
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");
    const bookingId=postJSONResponse.bookingid;

    const getAPIResponse=await request.get(`/booking/`,{params:{firstname:fname,lastname:lname}})
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe("OK");
    const getJSONResponse=await getAPIResponse.json();
    console.log("QueryParams API Response Body: ",getJSONResponse);
    
})