import { expect } from '@playwright/test'
import newUser from '../../fixtures/new-user.json'
import { UserRegistration } from '../../pages/user-registration';
import {test} from '../../fixtures/fixture'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(newUser.email, newUser.password)
})

test("Verify empty basket", async({basketPage})=>{
  await basketPage.openBasket()
  await expect(basketPage.basketButton).toHaveAttribute("tabindex", "0")
  await expect(basketPage.yourBasketHeading).toBeVisible()
  await expect(basketPage.userInBasketHeading).toContainText(newUser.email)
  await expect(basketPage.totalPrice).toHaveText("Total Price: 0¤")
  await expect(basketPage.checkoutButton).toHaveAttribute("disabled", "true")
})

test("Add products to basket", async ({products, basketPage})=>{
  const basketList = ["Apple Juice", "Apple Pomace", "Banana Juice", "Lemon Juice"]
  await products.addProductsToBasket(basketList)
  await basketPage.verifyBasket(basketList)
})
