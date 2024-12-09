import {HttpClient} from "~/http/http-client";

const http = new HttpClient({
    base_uri: import.meta.env.VITE_AUTHENTICATION_URL
})

type AuthenticationSuccessResponse = {
    token: string;
}

export async function authenticate(cpf: string){
    return await http.create<AuthenticationSuccessResponse>({ resource: "/auth", params: { cpf } });
}
