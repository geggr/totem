type ItemCategory = "DISH" | "SIDE_DISH" | "DRINK" | "DESSERT"

export type TotemItem = {
    id: number;
    imagePath: string;
    name: string;
    description: string;
    price: number;
    category: ItemCategory;
}