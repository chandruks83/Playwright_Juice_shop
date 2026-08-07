import { expect } from '@playwright/test'
import newUser from '../fixtures/new-user.json'
import { UserRegistration } from '../pages/user-registration';
import {test} from '../fixtures/fixture'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(newUser.email, newUser.password)
  console.log(await loginPage.verifyLoginSuccess())
})

test('create a new review', async ({page, productReview }) => {
  const productName = "Apple Juice"
  await productReview.submitAndVerifyProductReview(productName)
});


test.skip('User registration', async ({ page }) => {
  const userReg = new UserRegistration(page)
  await userReg.registerNewUser()
});


test("Verify empty basket", async({basketPage})=>{
  await basketPage.openBasket()
  await expect(basketPage.basketButton).toHaveAttribute("tabindex", "0")
  await expect(basketPage.yourBasketHeading).toBeVisible()
  await expect(basketPage.userInBasketHeading).toContainText(newUser.email)
  await expect(basketPage.totalPrice).toHaveText("Total Price: 0¤")
  await expect(basketPage.checkoutButton).toHaveAttribute("disabled", "true")
})
