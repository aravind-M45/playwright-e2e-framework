export async function formatAPIRequest(template:string, values:any[]):Promise<string>{
    return template.replace(/{(\d+)}/g, (match, key)=>{
        const index=parseInt(key,10);
        return index<values.length?String(values[index]):match;     
    });
}
import {BookingAPI} from "../Interfaces/PostAPI.interface";

export async function getPostAPIRequestBody(firstName:string, lastName:string, totalPrice:number,
    depositpaid:boolean,additionalneeds:string,checkin:string, checkout:string){
    const postAPIRequestBody:BookingAPI={
        "firstname": firstName,
        "lastname": lastName,
        "totalprice": totalPrice,
        "depositpaid": depositpaid,
        "additionalneeds": additionalneeds,
        "bookingdates": {
            "checkin": checkin,
            "checkout": checkout
        }
    }
    return postAPIRequestBody;
}
