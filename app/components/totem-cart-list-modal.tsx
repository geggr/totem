import {Dialog} from "@ariakit/react-core/dialog/dialog";
import {DialogHeading} from "@ariakit/react-core/dialog/dialog-heading";
import {DialogDismiss} from "@ariakit/react-core/dialog/dialog-dismiss";
import {useContext, useState} from "react";
import {TotemContext} from "~/contexts/totem-context";

type TotemCartListModalProps = {
    open: boolean;
    handleClose: () => void;
}

export function TotemCartListModal({open, handleClose}: TotemCartListModalProps) {
    const {items, addItem, removeItem} = useContext(TotemContext)

    return (
        <Dialog open={open} onClose={handleClose} className="dialog border border-black w-full max-w-[600px]">
            <DialogHeading className="text-2xl font-bold mb-8">Sua sacola</DialogHeading>
            <ul>
                {items.map(item => (
                    <li key={item.product.id}
                        className="grid grid-cols-2 justify-evenly items-center pb-4 border-black border-b">
                        <div className="flex flex-col items-center">
                            <div className="size-32">
                                <img src={item.product.imagePath} className="size-full object-contain"/>
                            </div>
                            <span> {item.product.name} </span>
                        </div>
                        <div className="w-full max-w-60 ml-auto flex flex-col gap-2 text-center">
                            <button
                                onClick={() => addItem(item.product)}
                                className="bg-green-800 text-white p-2 rounded-md">
                                Adicionar
                            </button>
                            <span className="font-bold text-lg"> Quantidade: {item.quantity} </span>
                            <button
                                onClick={() => removeItem(item.product)}
                                className="border border-red-800 text-red-800 p-2 rounded-md">
                                Remover
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <DialogDismiss className="bg-gray-800 text-white font-bold p-2 rounded-md">
                Fechar Sacola
            </DialogDismiss>
        </Dialog>
    )
}