import { Locator, Page, expect } from "@playwright/test";


export class BasketPage{

    readonly basketButton: Locator
    readonly yourBasketHeading: Locator
    readonly userInBasketHeading: Locator
    readonly totalPrice: Locator
    readonly checkoutButton: Locator    

    constructor(private page:Page){
        this.basketButton = this.page.getByRole("button",{name:"Show the shopping cart"})
        this.yourBasketHeading = this.page.getByRole("heading").filter({hasText:"Your Basket"})
        this.userInBasketHeading = this.yourBasketHeading.locator("small")
        this.totalPrice = this.page.locator("#price")
        this.checkoutButton = this.page.locator("#checkoutButton")
    }

    async openBasket(){

        await this.basketButton.click()
        
    }
}