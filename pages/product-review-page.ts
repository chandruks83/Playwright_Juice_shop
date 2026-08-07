import { Page, expect } from "@playwright/test";

export class ProductReview{

    constructor(private page:Page){}

    async submitAndVerifyProductReview(productName:string){
        const reviewComments = `Reviewed on ${Date.now()}`
        await this.page.locator('.item-name', {hasText:productName}).click()
        await this.page.getByRole("textbox", {name:"Text field to review a product"}).fill(reviewComments)
        await this.page.getByRole('button', {name:'Send the review'}).click()
        await this.page.getByText('Reviews').click()
        await expect(this.page.getByText(reviewComments)).toBeVisible()
    }
}