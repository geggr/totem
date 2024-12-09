import type {Route} from "../../../.react-router/types/app/routes/totem/+types/resume";
import {createOrder} from "~/gateways/order-gateway";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import type {CreatedOrderResponse} from "~/@types/order";
import {brl} from "~/utils/currency";
import {formatTimestamp} from "~/utils/date";

export async function clientAction({request}: Route.ClientActionArgs) {
    const { items } = await request.json()
    return await createOrder(items)
}

export default function TotemOrderResume({actionData}: Route.ComponentProps) {
    const order = actionData as CreatedOrderResponse
    const navigate = useNavigate();

    useEffect(() => {
        if (actionData === undefined) {
            navigate("/totem/identification")
        }
    }, [])

    if (!order) {
        return <h1>Faça seu pedido no Totem.</h1>
    }

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col h-full justify-center">
                <div className="flex flex-col gap-4 mb-8">
                    <h1 className="text-5xl font-bold text-green-800 mb-2">
                        Pedido Aprovado!
                    </h1>
                    <p className="text-3xl font-thin mb-2">
                        Muito obrigado por escolher o Totem Express!
                    </p>

                    <p className="text-2xl font-bold mb-8">
                        Detalhes do Pedido:
                    </p>
                </div>

                <div className="flex flex-col gap-4 shadow p-4 mb-8">
                    <dl className="grid grid-cols-2">
                        <dt className="font-bold">
                            Pedido
                        </dt>
                        <dd>
                            {order.id}
                        </dd>
                    </dl>

                    <dl v-if="state.order.possibleUserView" className="grid grid-cols-2">
                        <dt className="font-bold">
                            Cliente
                        </dt>
                        <dd>
                            {order.possibleUserView?.name}
                        </dd>
                    </dl>

                    <dl className="grid grid-cols-2">
                        <dt className="font-bold">
                            Data do Pedido:
                        </dt>
                        <dd>
                            {formatTimestamp(order.createdAt)}
                        </dd>
                    </dl>

                    <dl className="grid grid-cols-2">
                        <dt className="font-bold">
                            Status
                        </dt>
                        <dd>
                            {order.status}
                        </dd>
                    </dl>

                    <dl className="grid grid-cols-2">
                        <dt className="font-bold">
                            Total
                        </dt>
                        <dd>
                            {brl(order.total)}
                        </dd>
                    </dl>
                </div>
                <div>
                    <p className="text-2xl font-bold mb-8">
                        Itens do Pedido
                    </p>
                    <ul className="list-disc">
                        {order.items.map((item, index) => (
                            <li key={index} className="list-inside mb-4">
                                {item.quantity}x {item.name} = {brl(item.price)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}
