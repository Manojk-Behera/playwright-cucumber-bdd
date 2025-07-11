import{test,expect} from '@playwright/test'

export class CartPage{


    constructor(page){

        this.page = page;
        this.cartProducts = page.locator('div li').first();
        this.checkout = this.page.locator('text=Checkout');
    }

    async verifyProductisDisplayed(productName){

        await this.cartProducts.waitFor();
        const isProductVisible = await this.getProductLocator(productName).isVisible();
        expect(isProductVisible).toBeTruthy();

    }

    async Checkout(){

        await this.checkout.click();
    }

    getProductLocator(productName){

        return this.page.locator("h3:has-text('"+productName+"')")
    }

}