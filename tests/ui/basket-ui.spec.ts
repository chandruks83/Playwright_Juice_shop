import newUser from '../../fixtures/new-user.json'
import {test} from '../../fixtures/fixture'
import { expect } from '@playwright/test'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(newUser.email, newUser.password)
})

test("Verify empty basket", async({basketPage})=>{
  await basketPage.openBasket()
  await basketPage.cleanupBasket()
  await basketPage.verifyBasket([])
})

test("Add products to basket", async ({products, basketPage})=>{
  const basketList = ["Apple Juice", "Apple Pomace", "Banana Juice", "Lemon Juice"]
  await basketPage.cleanupBasket()
  await products.addProductsToBasket(basketList)
  await basketPage.verifyBasket(basketList)
  await basketPage.cleanupBasket()
})