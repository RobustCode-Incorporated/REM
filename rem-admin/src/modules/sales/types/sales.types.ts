export interface Customer {
  id: string
  name: string
  email: string
}

export interface Product {
  id: string
  name: string
  price: number
  stock: number
}

export interface Sale {
  id: string
  customer: Customer
  products: Product[]
  total: number
  date: string
}