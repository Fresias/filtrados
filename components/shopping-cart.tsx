"use client"

import { ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { useCart } from "./cart-context"

export function ShoppingCart() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative bg-white">
          <ShoppingBag className="h-5 w-5 text-[#570B0A]" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#F2BC57] text-[#570B0A] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variant || "default"}`} className="flex items-center gap-4 border-b pb-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-contain w-full h-full p-2"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  {item.variant && <p className="text-xs text-gray-500">Color: {item.variant}</p>}
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.variant)}
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id, item.variant)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        <SheetFooter className="border-t pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <Button className="w-full bg-[#570B0A] hover:bg-[#570B0A]/80 text-white" disabled={items.length === 0}>
              Proceder al pago
            </Button>
            {items.length > 0 && (
              <Button variant="outline" className="w-full" onClick={clearCart}>
                Vaciar carrito
              </Button>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
