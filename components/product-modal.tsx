"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { useCart } from "./cart-context"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants && product.variants.length > 0 ? product.variants[0].color : null,
  )
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!isOpen) return null

  const handleAddToCart = () => {
    addItem(
      product.id,
      product.name,
      product.price,
      selectedVariant
        ? product.variants?.find((v) => v.color === selectedVariant)?.image || product.image
        : product.image,
      quantity,
      selectedVariant || undefined,
    )
    onClose()
  }

  const selectedVariantData = selectedVariant ? product.variants?.find((v) => v.color === selectedVariant) : null

  const currentImage = selectedVariantData ? selectedVariantData.image : product.image

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#FFEDCO] p-8 max-w-2xl w-full rounded-lg relative">
        <button
          className="absolute top-4 right-4 text-[#570B0A] text-2xl font-bold"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X />
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="aspect-square relative bg-white rounded-md overflow-hidden">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-4"
                loading="eager"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-[#570B0A] mb-2">{product.name}</h3>
            <p className="text-xl font-bold text-[#570B0A] mb-4">{product.formattedPrice}</p>
            <p className="text-[#570B0A] mb-6">{product.description}</p>

            {/* Selector de variantes (colores) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#570B0A] mb-2">Color:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedVariant === variant.color ? "border-[#570B0A] ring-2 ring-[#F2BC57]" : "border-gray-300"
                      }`}
                      style={{ backgroundColor: variant.colorCode }}
                      onClick={() => setSelectedVariant(variant.color)}
                      aria-label={`Color ${variant.color}`}
                      title={variant.color}
                    />
                  ))}
                </div>
                {selectedVariantData && (
                  <p className="text-sm text-[#570B0A] mt-2">
                    {selectedVariantData.stock > 0 ? `Disponible: ${selectedVariantData.stock} unidades` : "Agotado"}
                  </p>
                )}
              </div>
            )}

            {/* Selector de cantidad */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-[#570B0A]">Cantidad:</span>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="mx-3 w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={selectedVariantData ? quantity >= selectedVariantData.stock : false}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              className="bg-[#F2BC57] text-[#570B0A] px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#F2BC57]/90 transition-colors w-full"
              onClick={handleAddToCart}
              disabled={selectedVariantData?.stock === 0}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Añadir al carrito</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
