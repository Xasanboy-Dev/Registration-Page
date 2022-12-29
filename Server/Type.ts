export type Electronics = {
    name: string
    price: number
    description: string
    model: string
}
export type fruicts = {
    name: string
    price: number
    description: string
}
export type listShopping = {
    Phones: Electronics[]
    Electronics: Electronics[]
}
export let shoppingList: listShopping = {
    Phones: [
        {
            name: "Samsung",
            price: 1200,
            description: "It's very good. You can buy it.",
            model: "S22 Ultra"
        },
        {
            name: "Iphone",
            price: 800,
            description: "It's very well. You can buy it.",
            model: "14 Pro Max"
        }
    ],
    Electronics: [
        {
            name: "TV",
            price: 1200,
            description: "It's very good. You can buy it.",
            model: "Artle"
        }
    ]
}