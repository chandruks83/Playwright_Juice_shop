import {test as base} from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { BasketPage } from '../pages/basket-page'
import { Products} from '../pages/products-page'
type Fixtures={
    loginPage:LoginPage
    basketPage:BasketPage
    products:Products
}

export const test = base.extend<Fixtures>({
    loginPage: async ({page}, use)=>{
        const loginPage = new LoginPage(page)
        await use(loginPage)
    },

    basketPage: async ({page}, use)=>{
        const basketPage = new BasketPage(page)
        await use(basketPage)
    },

    products: async ({page}, use)=>{
        const products = new Products(page)
        await use (products)
    }
})
