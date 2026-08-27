import {test as base, request} from '@playwright/test'
import {AuthApi} from '../api-clients/auth-api'
import { BasketApi } from '../api-clients/basket-api'

export type ApiFixture={
    api:AuthApi
    basketApi:BasketApi
}

export const test = base.extend<ApiFixture>({

    api: async ({request}, use)=>{
        const api = new AuthApi(request)
        await use(api)
    },

    basketApi: async ({request}, use)=>{
        const basketApi = new BasketApi(request)
        await use(basketApi)
    }
})
