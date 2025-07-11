//import base from '@playwright/test'
import { test as base } from '@playwright/test';

export const customtest = base.extend(
    {
       //custom fixture 'testDataForOrder'
       //this is the java script object so quote no need as json file its required 
       //"username" : "testpractice@mailinator.com" in json
       testDataForOrder : {
        username : "testpractice@mailinator.com",
        password : "Kumar@123",
        productName : "ADIDAS ORIGINAL"
    }

    }
)