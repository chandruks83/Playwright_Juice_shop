import { Locator, Page, expect } from "@playwright/test";
import user from '../test-data/user.json'

export class BasketPage{

    readonly basketButton: Locator
    readonly yourBasketHeading: Locator
    readonly userInBasketHeading: Locator
    readonly totalPrice: Locator
    readonly checkoutButton: Locator
    readonly basketTable:Locator    

    constructor(private page:Page){
        this.basketButton = this.page.getByRole("button",{name:"Show the shopping cart"})
        this.yourBasketHeading = this.page.getByRole("heading").filter({hasText:"Your Basket"})
        this.userInBasketHeading = this.yourBasketHeading.locator("small")
        this.totalPrice = this.page.locator("#price")
        this.checkoutButton = this.page.locator("#checkoutButton")
        this.basketTable = this.page.getByRole("table")
    }

    async openBasket(){
        await this.basketButton.click()
    }

    async cleanupBasket(){
        await this.openBasket()   
        const products = this.basketTable.locator('mat-row')
        let remainingRows = await products.count()
        while (remainingRows > 0){
            await products.first().locator(".mat-column-remove button").click()
            remainingRows--
            await expect(products).toHaveCount(remainingRows)
        }
    }

    async verifyBasket(products:string[]){
        await this.openBasket()
        if (products.length === 0){
            await expect(this.basketButton).toHaveAttribute("tabindex", "0")
            await expect(this.yourBasketHeading).toBeVisible()
            await expect(this.userInBasketHeading).toContainText(user.ui.email)
            await expect(this.totalPrice).toHaveText("Total Price: 0¤")
            await expect(this.checkoutButton).toHaveAttribute("disabled", "true")
        }
        else {
            const tableRows = this.page.locator('mat-table').locator('mat-row')
            await expect(tableRows).toHaveCount(products.length)
            for(const product of products){
                await expect.soft(this.page.getByRole('cell', {name:`${product}`}).getByText(`${product}`)).toBeVisible()
            }
        }
    }
}