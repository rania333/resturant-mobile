export interface ICardData {
    imgUrl: string,
    title: string,
    id: number,
    tags?: string[]
}

export enum cardType {
    restaurant = 'Resturant',
    menu = 'Menu'
}