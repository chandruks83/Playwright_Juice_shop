import { expect } from '@playwright/test'
import newUser from '../../fixtures/new-user.json'
import { UserRegistration } from '../../pages/user-registration';
import {test} from '../../fixtures/fixture'

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
  await products.addProductsToBasket(basketList)
  await basketPage.verifyBasket(basketList)
  await basketPage.cleanupBasket()
})

test.afterEach("cleanup", async({page})=>{
  await page.close()
})