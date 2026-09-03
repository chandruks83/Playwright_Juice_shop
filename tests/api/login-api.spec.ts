import {expect} from '@playwright/test'
import {test} from '../../fixtures/api-fixture'

let bearer = ""
let basketId = 0
test.beforeEach('Api login', async ({api})=>{
    ({bearer, basketId} = await api.login())
    
})

test('Verify empty basket', async ({basketApi})=>{
    await basketApi.emptyBasket(bearer, basketId)
    const basketDetails = await basketApi.basketStatus(bearer, basketId)
    expect(basketDetails.data.Products).toStrictEqual([])
})
