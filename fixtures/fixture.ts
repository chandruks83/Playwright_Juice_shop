import {test as base} from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { BasketPage } from '../pages/basket-page'
import { ProductReview} from '../pages/product-review-page'
type Fixtures={
    loginPage:LoginPage
    basketPage:BasketPage
    productReview:ProductReview
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

    productReview: async ({page}, use)=>{
        const productReview = new ProductReview(page)
        await use (productReview)
    }
})