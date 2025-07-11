import {test,expect} from '@playwright/test'

export class OrdersReviewPage{

            
       
    constructor(page){

        this.page = page;
        this.personalinformation = page.locator('.form__cc div').first();
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator('.ta-results');
        this.emailid = page.locator(".user__name [type='text']").first();
        this.placeorder = page.locator('.action__submit');
        this.orderconfirmationtext = page.locator('.hero-primary');
        this.orderid = page.locator(".em-spacer-1 .ng-star-inserted");

    }

    async searchCountryAndSelect(countryCode,countryName){

        await this.personalinformation.waitFor();
        await this.country.pressSequentially(countryCode);
        await this.dropdown.waitFor();
        const optioncount = await this.dropdown.locator('button').count();
            //select the country from the dropdown
            for (let i = 0; i < optioncount; i++) {
                //before 'India' there is a space so using ' India' to match the text
                const textfetchfromdropdown = await this.dropdown.locator('button').nth(i).textContent()
                //trim is required because 'textfetchfromdropdown' contains 'spacewithIndia'
                if(textfetchfromdropdown.trim() === countryName){
                    await this.dropdown.locator('button').nth(i).click();
                    break;
                }
            
            }

    }

    async VerifyEmailId(username){

        await expect(this.emailid).toHaveText(username);
    }

    async SubmitAndGetOrderId(){

        await this.placeorder.click();
        await this.orderconfirmationtext.waitFor();
        await expect(this.orderconfirmationtext).toHaveText(' Thankyou for the order. ');
        return this.orderid.textContent();
    }






}