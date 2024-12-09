import {HttpClient} from "~/http/http-client";
import type {TotemItem} from "~/@types/totem";

const http = new HttpClient({
    base_uri: "http://localhost:8080/api/product"
})

const PRODUCT_CATEGORIES = [
    { name: "Lanches de Carne", code: "DISH" },
    { name: "Acompanhamentos", code: "SIDE_DISH" },
    { name: "Bebidas", code: "DRINK" },
    { name: "Sobremesas", code: "DESSERT" }
]

export async function fetchAllProductsAvailable(){
    const products = await Promise.allSettled(
        PRODUCT_CATEGORIES
            .map(category => {
                return http
                    .retrieve<TotemItem[]>({ resource: "/".concat(category.code)})
                    .then(response =>  ({code: category.code, name: category.name, items: response}))
            })
    )

    return products
        .filter(product => product.status === 'fulfilled')
        .map(product => product.value)
}
