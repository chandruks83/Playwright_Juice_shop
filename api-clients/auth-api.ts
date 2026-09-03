import {APIRequestContext, expect} from '@playwright/test'


export class AuthApi {
    constructor (private request:APIRequestContext){
        this.request = request
    }

    async login(){
        const loginResponse = await this.request.post('/rest/user/login', {data:
            {
                "email": "1788432527078@shop.com",
                "password": "Juiceshop@1"
            } 
        })
        await expect(loginResponse).toBeOK()
        const respJson = await loginResponse.json()
        return {bearer:respJson.authentication.token, basketId:respJson.authentication.bid}
    }
}