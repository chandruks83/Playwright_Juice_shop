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


test("Verify empty basket", async({basketPage})=>{
  await basketPage.openBasket()
  await expect(basketPage.basketButton).toHaveAttribute("tabindex", "0")
  await expect(basketPage.yourBasketHeading).toBeVisible()
  await expect(basketPage.userInBasketHeading).toContainText(newUser.email)
  await expect(basketPage.totalPrice).toHaveText("Total Price: 0¤")
  await expect(basketPage.checkoutButton).toHaveAttribute("disabled", "true")
})