import { expect } from '@playwright/test'
import newUser from '../fixtures/new-user.json'
import { UserRegistration } from '../pages/user-registration';
import {test} from '../fixtures/fixture'

test.beforeEach("Login to juice shop", async ({loginPage})=>{
  await loginPage.login(newUser.email, newUser.password)
  console.log(await loginPage.verifyLoginSuccess())
})

// test.skip('can create a new review using the UI', async ({ loginPage }) => {
//   const productName = "Apple Juice"
//   const reviewComments = `Reviewed on ${Date.now()}`
//   // await loginPage.locator('.item-name', {hasText:productName}).click()
//   await page.getByRole("textbox", {name:"Text field to review a product"}).fill(reviewComments)
//   await page.getByRole('button', {name:'Send the review'}).click()
//   await page.getByText('Reviews').click()
//   const comment = await page.getByText(reviewComments).innerText()
//   expect(comment).toBe(reviewComments)
// });


// test.skip('can create a new review using the API', async ({ page }) => {
//   const userReg = new UserRegistration(page)
//   userReg.registerNewUser()
// });


test("Verify empty basket", async({loginPage, basketPage, page})=>{
  await basketPage.openBasket()
  await expect(basketPage.basketButton).toHaveAttribute("tabindex", "0")
  await expect(basketPage.yourBasketHeading).toBeVisible()
  await expect(basketPage.userInBasketHeading).toContainText(newUser.email)
  await expect(basketPage.totalPrice).toHaveText("Total Price: 0¤")
  await expect(basketPage.checkoutButton).toHaveAttribute("disabled", "true")
})
