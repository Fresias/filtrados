"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { CartItem } from "@/types/product"

interface CartContextType {
  items: CartItem[]
  addItem: (id: string, name: string, price: number, image: string, quantity: number, variant?: string) => void
  updateQuantity: (id: string, quantity: number, variant?: string) => void
  removeItem: (id: string, variant?: string) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error parsing cart from localStorage", e)
      }
    }
  }, [])

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  const addItem = (id: string, name: string, price: number, image: string, quantity: number, variant?: string) => {
    setItems((prevItems) => {
      // Buscar si el producto con la misma variante ya está en el carrito
      const existingItemIndex = prevItems.findIndex((item) => item.id === id && item.variant === variant)

      if (existingItemIndex >= 0) {
        // Si el producto ya está en el carrito, actualizar cantidad
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        }
        return updatedItems
      } else {
        // Si es un producto nuevo, añadirlo al carrito
        return [...prevItems, { id, name, price, image, quantity, variant }]
      }
    })
  }

  const updateQuantity = (id: string, quantity: number, variant?: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id && item.variant === variant ? { ...item, quantity } : item)),
    )
  }

  const removeItem = (id: string, variant?: string) => {
    setItems((prevItems) => prevItems.filter((item) => !(item.id === id && item.variant === variant)))
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
