import { expect, Page } from "@playwright/test";

export class UserRegistration{
    constructor(private page:Page){
        this.page = page
    }
    async registerNewUser(){
        await this.page.goto('/#/login')
        await this.page.locator('button', {hasText:'Dismiss'}).click()
        await this.page.locator('a', {hasText:"Me want it!"}).click()
        await this.page.locator('a', {hasText:"Not yet a customer"}).click()
        const uniqueEmail = `${Date.now()}@shop.com`
        const password = "Juiceshop@1"        
        
        await this.page.locator('#emailControl').fill(uniqueEmail)
        await this.page.locator('#passwordControl').fill(password)
        await this.page.locator('#repeatPasswordControl').fill(password)

        await this.page.getByRole("combobox", {name:"Selection list for the security question"}).click()
        const list = this.page.getByRole("listbox", {name:"Selection list for the security question"})

        await list.getByRole("option", {name:" Name of your favorite pet? "}).click()
        await this.page.getByRole("textbox", {name:"Field for the answer to the security question"}).fill("fish")
        this.page.getByRole("button", {name:"Button to complete the registration"}).click()
        const toastSuccessMsg = "Registration completed successfully. You can now log in."
        await expect(this.page.getByText(toastSuccessMsg, {exact:false})).toBeVisible()
    }
}