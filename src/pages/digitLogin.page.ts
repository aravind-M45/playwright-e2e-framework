import {test,expect,Page,Locator} from "@playwright/test"

export class DigitLoginPage {

    //Locators
    readonly page:Page;
    readonly email:Locator;
    readonly password:Locator;
    readonly continueButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.email=page.getByPlaceholder("Enter email or username");
        this.password=page.getByPlaceholder("Enter your password");
        this.continueButton=page.locator(".cl-formButtonPrimary");
    }

    //Action Methods
    async navigateToApplication(){
        await this.page.goto(`${process.env.DIGIT_URL}`)    
    }

    async enterEmail(email:string){
        await this.email.fill(email);
    }

    async clickContinue(){
        await this.continueButton.click();
    }

    async enterPassword(password:string){
        await this.password.fill(password);
    }
}