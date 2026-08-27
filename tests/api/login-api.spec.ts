import {expect} from '@playwright/test'
import {test} from '../../fixtures/api-fixture'
import { ApiTestConstants as data} from '../../test-data/test-constants'

let token = ""
test.beforeEach('Api login', async ({api})=>{
    token = await api.login(data.statusCodes.requestSuccess)
})

test('Verify empty basket', async ({basketApi: basketAPI})=>{
    const basketDetails = await basketAPI.basketStatus(token)
    expect(basketDetails.data.Products).toStrictEqual([])
})
