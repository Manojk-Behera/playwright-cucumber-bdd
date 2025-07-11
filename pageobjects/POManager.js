import { LoginPage } from "./LoginPage.js";
import { DashboardPage } from "./DashboardPage.js";
import { CartPage } from "./CartPage.js";
import { OrdersReviewPage } from "./OrdersReviewPage.js";
import { OrdersHistoryPage } from "./OrdersHistoryPage.js";


export class POManager{

    constructor(page){

        this.page = page;
        this.loginpage = new LoginPage(this.page);
        this.dashboardpage = new DashboardPage(this.page);
        this.cartpage = new CartPage(this.page);
        this.ordersreviewpage = new OrdersReviewPage(this.page);
        this.orderhistorypage = new OrdersHistoryPage(this.page);
    }

    getLoginPage(){

        return this.loginpage;
    }

    getDashboardPage(){
        
        return this.dashboardpage;
    }

    getCartPage(){
        
        return this.cartpage;
    }

    getOrdersReviewPage(){

        return this.ordersreviewpage;
    }

    getOrdersHistoryPage(){

        return this.orderhistorypage;
    }

}