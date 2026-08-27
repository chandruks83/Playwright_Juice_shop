import {APIRequestContext, expect} from '@playwright/test'


export class AuthApi {
    constructor (private request:APIRequestContext){
        this.request = request
    }

    async login(loginStatusCode:number){
        const loginResponse = await this.request.post('/rest/user/login', {data:
            {
                "email": "1787118182516@shop.com",
                "password": "Juiceshop@1"
            } 
        })
        expect(loginResponse.status()).toBe(loginStatusCode)
        const respJson = await loginResponse.json()
        const authToken = respJson.authentication.token
        return authToken
    }
}