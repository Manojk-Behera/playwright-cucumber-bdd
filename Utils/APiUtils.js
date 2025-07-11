class APiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;   
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
              data: this.loginPayload
           });
           //validate the login response 200,201,204
           const loginResponseJson = await loginResponse.json();
           const token = loginResponseJson.token;
           console.log('Login Token:', token);
           return token;
    }

    async createOrder(orderPayload) {
        
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        });

        const orderResponseJson = await orderResponse.json();
        console.log('Order Response:', orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}

module.exports = {APiUtils};