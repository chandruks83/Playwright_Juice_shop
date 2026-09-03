import { APIRequestContext,expect } from "@playwright/test";


export class BasketApi{
    constructor(private request:APIRequestContext){}

    async basketStatus(bearerToken:string, basketId:number){
        const basketResp = await this.request.get(`rest/basket/${basketId}`, {headers: {Authorization: `Bearer ${bearerToken}`}})
        await expect(basketResp).toBeOK()
        const basketRespJson = await basketResp.json()
        return basketRespJson
    }

    async emptyBasket(bearerToken:string, basketId:number){
        const url = `rest/basket/${basketId}`
        const productsInBasket = await this.request.get(url, {headers: {Authorization: `Bearer ${bearerToken}`}})
        await expect(productsInBasket).toBeOK()
        const productsInBasketJson = await productsInBasket.json()
        const allProducts = productsInBasketJson.data.Products
        for(const product of allProducts){
            const productId = product.BasketItem.id
            await this.request.delete(`api/BasketItems/${productId}`, {headers: {Authorization: `Bearer ${bearerToken}`}})
        }

        const basket = await this.request.get(url, {headers: {Authorization: `Bearer ${bearerToken}`}})
        const basketJson = await basket.json()
        expect(basketJson.data.Products).toHaveLength(0)
    }

    async addProducts(productId:Map<number, [number, string]>, bearerToken:string, basketId:number){
        for (const [product, [quantity, name]] of productId){
            const resp = await this.request.post("/api/BasketItems/", {
                headers: {Authorization: `Bearer ${bearerToken}`}, 
                data:{
                    "ProductId": product,
                    "BasketId": String(basketId),
                    "quantity": quantity
                    }
                })
            await expect(resp).toBeOK()       
        }
        
        const productsInBasket = await this.request.get(`rest/basket/${basketId}`, {headers: {Authorization: `Bearer ${bearerToken}`}})
        const productsInBasketJson = await productsInBasket.json()
        const allProducts = productsInBasketJson.data.Products
        return allProducts
    }
}
