import { HttpClient } from "~/http/http-client";
import type {CartItem} from "~/contexts/totem-context";
import type {CreatedOrderResponse} from "~/@types/order";

const http = new HttpClient({ base_uri: "http://localhost:8080/api/order" })

export async function createOrder(items: CartItem[]){
    const products = items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity
    }))

    return await http.create<CreatedOrderResponse>({
        resource: "/create",
        params: {
            orderItemsRequest: products
        }
    })
}