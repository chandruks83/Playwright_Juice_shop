import { APIRequestContext,expect } from "@playwright/test";


export class BasketApi{
    constructor(private request:APIRequestContext){}

    async basketStatus(bearerToken:string){
        const basketResp = await this.request.get('/rest/basket/6', {headers: {Authorization: `Bearer ${bearerToken}`}})
        expect(basketResp).toBeOK()
        const basketRespJson = await basketResp.json()
        return basketRespJson
    }

    async emptyBasket(bearerToken:string){
        const productsInBasket = await this.request.get("rest/basket/6", {headers: {Authorization: `Bearer ${bearerToken}`}})
        const productsInBasketJson = await productsInBasket.json()
        const allProducts = productsInBasketJson.data.Products
        for(const product of allProducts){
            const productId = product.BasketItem.id
            await this.request.delete(`api/BasketItems/${productId}`, {headers: {Authorization: `Bearer ${bearerToken}`}})
        }

        const basket = await this.request.get("rest/basket/6", {headers: {Authorization: `Bearer ${bearerToken}`}})
        const basketJson = await basket.json()
        expect(basketJson.data.Products).toHaveLength(0)
    }

    async addProducts(productId:Map<number, [number, string]>, bearerToken:string){
        for (const [product, [quantity, name]] of productId){
            const resp = await this.request.post("/api/BasketItems/", {
                headers: {Authorization: `Bearer ${bearerToken}`}, 
                data:{
                    "ProductId": product,
                    "BasketId": "6",
                    "quantity": quantity
                    }
                })
            expect(resp).toBeOK()       
        }
        
        const productsInBasket = await this.request.get("rest/basket/6", {headers: {Authorization: `Bearer ${bearerToken}`}})
        const productsInBasketJson = await productsInBasket.json()
        const allProducts = productsInBasketJson.data.Products
        return allProducts
    }
}
