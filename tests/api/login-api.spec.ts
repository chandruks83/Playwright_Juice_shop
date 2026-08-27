import {expect} from '@playwright/test'
import {test} from '../../fixtures/api-fixture'

let token = ""
test.beforeEach('Api login', async ({api})=>{
    token = await api.login()
    
})

test('Verify empty basket', async ({basketApi})=>{
    await basketApi.emptyBasket(token)
    const basketDetails = await basketApi.basketStatus(token)
    expect(basketDetails.data.Products).toStrictEqual([])
})
