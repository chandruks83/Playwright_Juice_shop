import { expect } from '@playwright/test'
import user from '../../test-data/user.json'
import {test} from '../../fixtures/fixture'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(user.ui.email, user.ui.password)
})

test('create a new review @smoke', async ({products}) => {
  const productName = "Apple Juice"
  await products.submitAndVerifyProductReview(productName)
});