import {useContext, useState} from "react";
import {TotemContext} from "~/contexts/totem-context";
import {brl} from "~/utils/currency";
import {twMerge} from "tailwind-merge";
import {TotemCartListModal} from "~/components/totem-cart-list-modal";
import {useSubmit} from "react-router";

export function TotemCart() {
    const [open, setOpen] = useState(false);
    const submit = useSubmit()
    const context = useContext(TotemContext)

    const amount = context.items.reduce((sum, item) => sum + item.product.price  * item.quantity, 0);
    const items = context.items.length
    const hasItems = items > 0

    async function handleCreateOrderForCart(){
        return submit(
            { items: context.items },
            { action: "/totem/resume", method: "POST", encType: "application/json" }
        )
    }

    return (
        <>

            <div className={twMerge(
                "h-[150px] p-8 text-black bg-white border border-black border-t w-full",
                hasItems && "absolute bottom-0 left-0",
                !hasItems && "hidden"
            )}>
                <div className="w-full max-w-7xl mx-auto grid grid-cols-2">

                    <div className="text-left">
                        <p className="text-lg">
                            Total: <span className="font-bold"> {brl(amount)} </span>
                        </p>
                        <p className="text-lg">
                            Quantidade de Items: <span className="font-bold"> {context.items.length} </span>
                        </p>
                        <button className="bg-green-800 text-white font-bold p-2 rounded-md" onClick={() => setOpen(true)}>
                            Ver produtos do carrinho
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 w-full max-w-96 ml-auto">

                        <button className="bg-green-800 text-white font-bold p-2 rounded-md" onClick={handleCreateOrderForCart}>
                            Ir para Pagamento
                        </button>

                        <button className="border border-red-800 text-red-800 font-bold p-2 rounded-md">
                            Cancelar Pedido
                        </button>

                    </div>
                </div>
            </div>

            <TotemCartListModal
                open={open}
                handleClose={() => setOpen(false)}
            />
        </>

    )
}