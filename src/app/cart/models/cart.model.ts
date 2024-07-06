export interface ICart {
    id: number
    name: string
    thumbnail: string
    price: number
    qnt: number
}

export interface IOrder {
    itemId: number
    quantity: number
}