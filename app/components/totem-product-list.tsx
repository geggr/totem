import type {TotemItem} from "~/@types/totem";
import {brl} from "~/utils/currency";
import {TotemContext} from "~/contexts/totem-context";
import {useContext} from "react";

type TotemProductListProps = {
    items: TotemItem[]
}

export function TotemProductList({items}: TotemProductListProps) {
    const { addItem } = useContext(TotemContext)

    return (
        <ul className="w-full mb-auto grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {items.map(item => (
                <li key={item.id}
                    className="h-full max-h-[250px] text-center flex flex-col items-center border border-black rounded-sm hover:bg-gray-100">
                    <div className="size-32">
                        <img src={item.imagePath} className="w-full h-full object-contain"
                             alt="Foto ilustrativa do produto"/>
                    </div>
                    <h2 className="text-lg font-bold">
                        {item.name}
                    </h2>
                    <span className="mb-4">
                        {brl(item.price)}
                    </span>
                    <button
                        onClick={() => {
                            console.log("Adding " + item.name + " to cart")
                            addItem(item)
                        }}
                        className="mt-auto w-full p-2 bg-green-800 text-white font-bold">
                        Adicionar ao pedido
                    </button>
                </li>
            ))}
        </ul>
    )
}