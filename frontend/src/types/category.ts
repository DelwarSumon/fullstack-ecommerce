export interface Category{
    id: string
    name: string
    image: string
}

export interface CategoryList{
    list: Category[]
}

export interface Price {
    id: string
    min: number
    max: number
}