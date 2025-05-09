// Definición de tipos para productos
export interface ProductVariant {
  color: string
  colorCode: string // Código hexadecimal del color
  image: string
  stock: number
}

export interface Product {
  id: string
  name: string
  price: number
  formattedPrice: string
  description: string
  image: string
  category: string
  featured: boolean
  variants?: ProductVariant[]
  width: number
  height: number
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: string // Color seleccionado
}
