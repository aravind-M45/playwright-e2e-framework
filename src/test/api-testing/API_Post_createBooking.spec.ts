
import {test,expect} from "@playwright/test"
import PostAPIBookingData from "../../test-data/API_testdata/POST_BookingDetails.json"


test.use({
    baseURL:"https://restful-booker.herokuapp.com",
})
test("POST API request using static file to Create Booking",{tag:'@api'},async ({request})=>{
    const postAPIResponse=await request.post("/booking",{data:PostAPIBookingData})
    const postJSONResponse=await postAPIResponse.json()
    console.log(postJSONResponse)

    //Valaidate the response
    expect(postAPIResponse.status()).toBe(200)
    expect(postAPIResponse.statusText()).toBe("OK")

    //validate the headers
    expect(postAPIResponse.headers()['content-type']).toBe("application/json; charset=utf-8")

    //validate response body property/keys
    expect(postJSONResponse.booking).toHaveProperty("firstname")
    expect(postJSONResponse.booking).toHaveProperty("lastname")
    expect(postJSONResponse.booking.bookingdates).toHaveProperty("checkin")
    expect(postJSONResponse.booking.bookingdates).toHaveProperty("checkout")

    expect(postJSONResponse.booking.firstname).toBe(PostAPIBookingData.firstname)
    expect(postJSONResponse.booking.lastname).toBe(PostAPIBookingData.lastname)
    expect(postJSONResponse.booking.bookingdates.checkin).toBe(PostAPIBookingData.bookingdates.checkin)
    expect(postJSONResponse.booking.bookingdates.checkout).toBe(PostAPIBookingData.bookingdates.checkout)

})
