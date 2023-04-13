import { Product } from "./product"

export interface CartButton{
    id: string
    product: Product
}
export interface CartItems{
    id: string
    product: Product
    count:number
}

export interface CartReducer{
    items: CartItems[]
    count: number
    total: number
}