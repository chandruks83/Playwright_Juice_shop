import {APIRequestContext, expect} from '@playwright/test'
import user from '../test-data/user.json'

export class AuthApi {
    constructor (private request:APIRequestContext){
        this.request = request
    }

    async login(){
        const loginResponse = await this.request.post('/rest/user/login', {data:
            {
                "email": user.api.email,
                "password": user.api.password
            } 
        })
        await expect(loginResponse).toBeOK()
        const respJson = await loginResponse.json()
        return {bearer:respJson.authentication.token, basketId:respJson.authentication.bid}
    }
}