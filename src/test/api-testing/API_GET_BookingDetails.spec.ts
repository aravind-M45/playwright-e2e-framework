import {test,expect} from "@playwright/test";
import {faker} from "@faker-js/faker";
import {getPostAPIRequestBody} from "../../utils/APIHelpers";


test.use({
    baseURL:"https://restful-booker.herokuapp.com",
})

test("GET BookingDetails using playwright",{tag:"@api"},async ({request})=>{
    const fname=faker.person.firstName();
    const lname=faker.person.lastName();
    const totalPrice=faker.number.int({min:10,max:1000});
    const APIRequestBody= await getPostAPIRequestBody(fname,lname,totalPrice,true,"breakfast","2026-06-01","2026-06-10")
    const postAPIResponse=await request.post("/booking",{data:APIRequestBody})
    const postAPIJSONResponse=await postAPIResponse.json();
    console.log("POST API Response Body: ",postAPIJSONResponse);

    //API response validation
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");
    expect(postAPIResponse.headers()['content-type']).toContain("application/json; charset=utf-8");

    //API response body validation
    expect(postAPIJSONResponse.booking).toHaveProperty("firstname");
    expect(postAPIJSONResponse.booking).toHaveProperty("lastname");
    expect(postAPIJSONResponse.booking).toHaveProperty("totalprice");
    expect(postAPIJSONResponse.booking.firstname).toBe(fname);
    expect(postAPIJSONResponse.booking.lastname).toBe(lname);
    expect(postAPIJSONResponse.booking.totalprice).toBe(totalPrice); 
    expect(postAPIJSONResponse.bookingid).toBeGreaterThan(0);
    console.log("Booking ID: ",postAPIJSONResponse.bookingid);

    //GET Booking details
    const getAPIResponse=await request.get(`/booking/${postAPIJSONResponse.bookingid}`);
    const getAPIJSONResponse=await getAPIResponse.json();
    console.log("GET API Response Body: ",getAPIJSONResponse);

    //GET API response validation
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe("OK");
})  