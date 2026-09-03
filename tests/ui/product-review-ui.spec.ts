import { expect } from '@playwright/test'
import newUser from '../../fixtures/new-user.json'
import {test} from '../../fixtures/fixture'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(newUser.email, newUser.password)
})

test('create a new review @smoke', async ({products}) => {
  const productName = "Apple Juice"
  await products.submitAndVerifyProductReview(productName)
});