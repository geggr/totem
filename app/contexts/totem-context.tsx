import {createContext, useReducer, useState} from "react";
import type {TotemItem} from "~/@types/totem";

export type CartItem = {
    product: TotemItem,
    quantity: number,
}

type TotemContextType = {
    setCustomerName: (customerName: string) => void,
    user: {
        name: string
    }
    items: CartItem[],
    addItem: (item: TotemItem) => void,
    removeItem: (item: TotemItem) => void,
    deleteItem: (item: TotemItem) => void,
}

type CartAction = {
    type: string;
    payload: TotemItem;
}

export const TotemContext = createContext<TotemContextType>({} as TotemContextType);

const cartReducer = (cart: CartItem[], action: CartAction) => {
    switch (action.type) {

        case 'ADD_ITEM': {
            const currentIndex = cart.findIndex(
                item => item.product.id === action.payload.id
            )

            if (currentIndex < 0) {
                return [...cart, {product: action.payload, quantity: 1}];
            }

            return cart.map((item, index) =>
                (index === currentIndex)
                    ? {...item, quantity: item.quantity + 1}
                    : item
            )
        }

        case 'REMOVE_ITEM': {
            const current = cart.find(item => item.product.id === action.payload.id)

            if (current && current.quantity > 1) {
                return cart.map((item) =>
                    (item.product.id === action.payload.id)
                        ? {...item, quantity: item.quantity - 1}
                        : item
                )
            }

            return cart.filter(item => item.product.id !== action.payload.id)
        }

        case 'DELETE_ITEM': {
            return cart.filter(item => item.product.id !== action.payload.id)
        }

        default: {
            return cart
        }
    }
}


export default function TotemContextProvider({children}: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, [] as CartItem[])
    const [name, setName] = useState<string>("")

    const addItem = (item: TotemItem) => dispatch({type: 'ADD_ITEM', payload: item})
    const removeItem = (item: TotemItem) => dispatch({type: 'REMOVE_ITEM', payload: item})
    const deleteItem = (item: TotemItem) => dispatch({type: 'DELETE_ITEM', payload: item})

    return (
        <TotemContext value={{
            items: cart,
            user: {
                name: name,
            },
            addItem,
            removeItem,
            deleteItem,
            setCustomerName: setName
        }}>
            {children}
        </TotemContext>
    )

}