import { expect, Page } from "@playwright/test";
import newUser from '../fixtures/new-user.json'

export class UserRegistration{
    constructor(private page:Page){
        this.page = page
    }
    async registerNewUser(){
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
        
        const toastSuccessMsg = "Registration completed successfully. You can now log in."
        const snackBar = this.page.getByRole("status").filter({hasText:toastSuccessMsg})

        await Promise.all([
            snackBar.waitFor({state:"visible",timeout:5000}),
            this.page.getByRole("button", {name:"Button to complete the registration"}).click()
        ])
        
        await expect(snackBar).toHaveText(toastSuccessMsg)
        await this.page.waitForTimeout(5000)
    }
}