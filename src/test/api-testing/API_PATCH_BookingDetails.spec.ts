
import { test, expect } from "@playwright/test"
import { faker } from "@faker-js/faker";
import { getPostAPIRequestBody } from "../../utils/APIHelpers"
import TokenRequestBody from "../../test-data/API_testdata/POST_TokenRequest.json"
import PATCHBookingData from "../../test-data/API_testdata/PATCH_BookingData.json"

test.use({
    baseURL: "https://restful-booker.herokuapp.com"
})

test("Create PATCH API request for Booking",{tag:"@api"}, async ({ request }) => {
    const fname = faker.person.firstName();
    const lname = faker.person.lastName();
    const totalPrice = faker.number.int({ min: 10, max: 1000 });
    const APIRequestBody = await getPostAPIRequestBody(fname, lname, totalPrice, true, "food", "2026-10-19", "2026-10-24");
    const postAPIResponse = await request.post("/booking", { data: APIRequestBody });
    //Validate postAPIRespose status
    expect(postAPIResponse.status()).toBe(200);
    expect(postAPIResponse.statusText()).toBe("OK");

    //Convert POST API Response to POST JSON response
    const postJSONResponse = await postAPIResponse.json();
    console.log("Post API JSON Response: ", postJSONResponse);  //print

    //postAPIJSONResponse Validations
    expect(postJSONResponse.booking).toHaveProperty("firstname");
    expect(postJSONResponse.booking).toHaveProperty("lastname");
    const bookingID = postJSONResponse.bookingid;
    console.log("Booking ID: " + bookingID);                               //print
    expect(bookingID).toBeGreaterThan(0);

    //GET API Request
    const getAPIResponse = await request.get(`/booking/${bookingID}`);
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe("OK");
    const getJSONResponse = await getAPIResponse.json();
    console.log("GET API JSON Response: ", JSON.stringify(getJSONResponse, null, 2))

    //Token Generator
    const tokenAPIResponse = await request.post("/auth", { data: TokenRequestBody })
    expect(tokenAPIResponse.status()).toBe(200);
    expect(tokenAPIResponse.statusText()).toBe("OK");
    const tokenJSONResponse = await tokenAPIResponse.json();
    const token = tokenJSONResponse.token
    console.log("Generated Token: " + token)
    //PATCH API Request for updating the Booking details
    
    const patchAPIResponse=await request.patch(`/booking/${bookingID}`,{
        headers:{
            "Cookie":`token=${token}`
        },
        data:PATCHBookingData
    })
    const patchJSONResponse=await patchAPIResponse.json();
    console.log("Patch API JSON Response: ",JSON.stringify(patchJSONResponse,null,2))
    expect(patchAPIResponse.status()).toBe(200);
    expect(patchAPIResponse.statusText()).toBe("OK")
    expect(patchJSONResponse.firstname).toBe(PATCHBookingData.firstname)

})