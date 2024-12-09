export type CreatedOrderResponse = {
    createdAt: string;
    updatedAt: string;
    items: [
        {
            name: string
            quantity: number,
            price: number
        }
    ],
    total: number,
    status: string,
    id: number,
    possibleUserView: {
        id: number,
        name: string
    }
}