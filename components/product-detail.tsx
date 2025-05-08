"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ShoppingCart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: string
  image: string
  description: string
}

interface ProductDetailProps {
  product: Product
  onClose: () => void
}

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Animar la aparición del modal
    gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.1 })

    // Añadir event listener para cerrar con Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)

    return () => {
      window.removeEventListener("keydown", handleEscape)
    }
  }, [onClose])

  const handleClose = () => {
    // Animar la salida del modal
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div ref={contentRef} className="bg-[#FFEDCO] p-8 max-w-2xl w-full rounded-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#570B0A] text-2xl font-bold hover:opacity-70 transition-opacity"
        >
          &times;
        </button>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2">
            <div className="aspect-square relative bg-white rounded-md overflow-hidden">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain p-4" />
            </div>
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold text-[#570B0A] mb-2">{product.name}</h3>
            <p className="text-xl font-bold text-[#570B0A] mb-4">{product.price}</p>
            <p className="text-[#570B0A] mb-6">{product.description}</p>
            <button className="bg-[#570B0A] text-[#FFEDCO] px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#570B0A]/90 transition-colors">
              <span>Añadir al carrito</span>
              <ShoppingCart size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
