import {useMemo} from "react";
import {fetchAllProductsAvailable} from "~/gateways/products-gateway";
import type {Route} from "../../../.react-router/types/app/routes/totem/+types/products";
import {TotemNavigationMenu} from "~/components/totem-navigation-menu";
import {useHash} from "~/hooks/use-hash";
import type {TotemItem} from "~/@types/totem";
import {TotemProductList} from "~/components/totem-product-list";
import {TotemCart} from "~/components/totem-cart";

export async function clientLoader() {
    return await fetchAllProductsAvailable()
}

export default function ProductsStep({loaderData}: Route.ComponentProps) {
    const [hash] = useHash("dish")

    const products = useMemo(() => {

        if (!hash) return []

        const category = loaderData
            .filter((category) => category.code.toLowerCase() === hash)

        if (category === undefined || category.length < 0) return [] as TotemItem[]

        // @ts-ignore
        return category.at(0).items
    }, [loaderData, hash])


    return (
        <>
            <div className="grid grid-cols-[200px,1fr] gap-10 py-10 pr-10 items-center justify-center">
                <TotemNavigationMenu/>
                <TotemProductList items={products}/>
                <TotemCart/>
            </div>
        </>

    )
}