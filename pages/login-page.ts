import {expect, Page} from '@playwright/test'
import newUser from '../fixtures/new-user.json'

export class LoginPage{

    constructor(private page:Page){
        this.page = page
    }

    async handlePopups(){
        await this.page.locator('button', {hasText:'Dismiss'}).click()
        await this.page.locator('a', {hasText:"Me want it!"}).click()
    }
    
    async login(userName:string, password:string){
        await this.page.goto('/#/login')
        await this.handlePopups()
        // await this.page.locator('#navbarAccount').click()
        // await this.page.locator("[aria-label='Go to login page'][role='menuitem']").click()
        await this.page.getByRole("textbox", {name:"Text field for the login email"}).fill(userName)
        await this.page.locator('#password').fill(password)
        await this.page.getByRole("button", {name:"Login", exact:true}).click()
    }

    async verifyLoginSuccess(){   
        await expect (this.page.getByText("All Products")).toBeVisible()
    }
}