import{test,expect} from '@playwright/test'

export class OrdersHistoryPage{

    constructor(page){

        this.page = page;
        this.ordertable = page.locator('tbody');
        this.rows = page.locator('tbody tr')
        this.orderiddetails = page.locator('.col-text')

    }

    async searchOrderAndSelect(orderid){

        await this.ordertable.waitFor();

        for (let i = 0; i < await this.rows.count(); i++) {
            let roworderid = await this.rows.nth(i).locator("th").textContent(); 
            if(orderid.includes(roworderid)){
                // If the order ID matches, click on view button on that row
                await this.rows.nth(i).locator('button').first().click();
                break;
            }
        
        }


    }

    async getOrderId(){

       return await this.orderiddetails.textContent();
    }

}