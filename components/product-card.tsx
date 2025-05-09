"use client"

import Image from "next/image"
import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import { ProductModal } from "./product-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <div
        className="product-item border border-[#570B0A]/20 aspect-square relative overflow-hidden cursor-pointer transition-all duration-300 bg-white"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <div className="flex flex-col items-center justify-center h-full p-6 transition-transform duration-300">
          <div className="relative w-full h-3/5 mb-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-contain transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
            />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-[#570B0A] text-center">{product.name}</h3>
          <p className="text-md md:text-lg font-semibold text-[#570B0A] mt-2">{product.formattedPrice}</p>

          {/* Indicador de variantes */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex mt-2 gap-1">
              {product.variants.slice(0, 3).map((variant) => (
                <div
                  key={variant.color}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: variant.colorCode }}
                  title={variant.color}
                />
              ))}
              {product.variants.length > 3 && (
                <div className="text-xs text-[#570B0A]">+{product.variants.length - 3}</div>
              )}
            </div>
          )}

          {/* Botón de ver detalles que aparece al hacer hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[#F2BC57] p-3 transform transition-transform duration-300 ${
              isHovered ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
              className="w-full bg-[#570B0A] hover:bg-[#570B0A]/80 text-white"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de detalles del producto */}
      <ProductModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
