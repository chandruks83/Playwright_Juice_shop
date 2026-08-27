import { expect } from '@playwright/test'
import {test} from '../../fixtures/api-fixture'

let bearer = ""
test.beforeEach("Login", async ({api})=>{
    bearer = await api.login()
})

test("Add products to basket", async ({basketApi})=>{
    await basketApi.emptyBasket(bearer)
    const productIds = new Map<number, [number, string]>([[1,[1, "Apple Juice"]], [6, [2, "Banana Juice"]]])
    const productDetails = await basketApi.addProducts(productIds, bearer)
    expect(productDetails).toHaveLength(productIds.size)
    for(const product of productDetails){
        const inputDetails = productIds.get(product.id)
        expect(inputDetails, `Unexpected product ID:${product.id}`).toBeDefined()
        const [expectedQuantity, expectedName] = inputDetails
        expect(product.name).toContain(expectedName)
        expect(product.BasketItem.quantity).toEqual(expectedQuantity)   
    }
})