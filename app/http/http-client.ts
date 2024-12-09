export class HttpClient {
    private url: string;

    constructor({ base_uri }: { base_uri: string }) {
        this.url = base_uri
    }

    async retrieve<T>({ resource = "", query } : { resource: string, query?: string }) : Promise<T> {
        const params = query ? `?${query}` : ""
        const response = await fetch(`${this.url}${resource}${params}`)

        if (!response.ok) throw new Error("Failed to fetch");

        return response.json()
    }

    async remove({ resource }: { resource: string }) {
        return fetch(`${this.url}${resource}`, { method: 'DELETE' })
    }

    async create<T>({ resource = "", params, mode }: {resource: string, params: object, mode?: RequestMode }): Promise<T> {
        const response = await fetch(`${this.url}${resource}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("authentication")}`,
            },
            body: JSON.stringify(params)
        })

        if (!response.ok) throw new Error("Failed to create");

        return response.json()
    }

    async update<T>({ resource = "", params }: {resource: string, params: object}) : Promise<T | null> {
        const response = await fetch(`${this.url}${resource}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(params)
        })

        if (!response.ok) return null

        return response.json()
    }
}