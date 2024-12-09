import { Form, Link, redirect } from "react-router";
import type { Route } from "../../../.react-router/types/app/routes/totem/+types/identification";

export default function IdentificationStep({ actionData }: Route.ComponentProps){
    const error = actionData as { error: string }
    return (
        <div className="bg-green-800 h-full w-full flex items-center justify-center">
            <div className="w-full max-w-[600px] text-center  rounded-md h-1/2 p-10 ">
                <h1 className="text-white text-2xl font-bold mb-4">Deseja se Identificar?</h1>
                <Form method="POST" className="mb-4">
                    <input type="text" name="cpf" className="px-4 py-2 rounded bg-white rounded-r-none" placeholder="Digite seu CPF..." />
                    <button type="submit" className="px-4 py-2 rounded bg-yellow-400 rounded-l-none">
                        Entrar
                    </button>
                    { error && <span className="text-red-500"> {error.error}</span> }
                </Form>
                <Link to="/totem/products" className="text-white underline text-xs  ">
                    Entrar sem se registrar
                </Link>
            </div>
        </div>
    )
}

export async function clientAction({ request } : Route.ActionArgs){
    const form = await request.formData()
    const cpf = form.get("cpf") as string;
    // const response = await authenticate(cpf)

    let response = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxfQ.zB3dOsfpvubHkFVGNhM-oARE6HweRgG3A2FtVeB4gfc"
    }

    if (!response){
        return {
            error: "CPF inválido. Tente novamente!"
        }
    }

    const { token } = response;

    localStorage.setItem("authentication", token);

    return redirect("/totem/products")
}