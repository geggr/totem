const categories = [
    {
        code: 'dish',
        name: 'Sanduiches',
        image: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$k6XhRUE7/200/200/original?country=br'
    },
    {
        code: 'side_dish',
        name: 'Acompanhamentos',
        image: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$k8XpwlXZ/200/200/original?country=br'
    },
    {
        code: 'drink',
        name: 'Bebidas',
        image: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kUXY3lKf/200/200/original?country=br'
    },
    {
        code: 'dessert',
        name: 'Sobremesas',
        image: 'https://cache-backend-mcd.mcdonaldscupones.com/media/image/product$kxX1aUjQ/200/200/original?country=br'
    }
]

export function TotemNavigationMenu() {
    return (
        <nav className="border border-gray-500 rounded-tr-md rounded-br-md">
            {categories.map(category => (
                <a href={ "#".concat(category.code)} key={category.code} className="block h-full w-full p-6 text-center font-bold border border-gray-500 border-t hover:bg-gray-100">
                    <div className="w-32">
                        <img className="w-full h-full" src={category.image} loading="lazy"/>
                    </div>
                    {category.name}
                </a>
            ))}
        </nav>
    )
}