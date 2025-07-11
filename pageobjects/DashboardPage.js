export class DashboardPage{

    constructor(page){

        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator('[routerlink="/dashboard/cart"]');
        this.order = page.locator('button[routerlink="/dashboard/myorders"]');
    }

    async searchProductandAddtoCart(productName){

         const productNames = await this.productsText.allTextContents();
                console.log('Product Names:', productNames);
                //fetch all the product one by one if prduct matches with adidas original then click on add to cart
                for (let i = 0; i < productNames.length; i++) {
                    if (productNames[i].toLowerCase().includes(productName.toLowerCase())) {
                        //above condtion or this if(products.nth(i).locator('b').textContent() === productName){
                        await this.products.nth(i).locator('text=Add To Cart').click();
                        break;
                    }
                }

    }

    async navigateToCart(){

        //click on cart icon
        await this.cart.click();
    }

    async navigateToOrder(){

        //click on the Order icon
        await this.order.click();
    }

}