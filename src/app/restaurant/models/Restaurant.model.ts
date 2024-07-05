export interface IResturant {
    id: number,
    name: string,
    restaurantBackground: string,
    background?: string,
    tags: string[],
    menus: IMenu[]
}

export interface IMenu {
    id: number,
    name: string,
    background: string
    restaurantBackground?: string,
    tags?: string[]
}