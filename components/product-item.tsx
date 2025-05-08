"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

interface Product {
  id: string
  name: string
  price: string
  image: string
  description: string
  width?: number
  height?: number
}

interface ProductItemProps {
  product: Product
  isActive: boolean
  onClick: () => void
}

export function ProductItem({ product, isActive, onClick }: ProductItemProps) {
  const productRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const priceRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Efecto hover con GSAP
  useEffect(() => {
    if (!productRef.current) return

    // Timeline para la animación de hover
    timelineRef.current = gsap.timeline({ paused: true })

    timelineRef.current
      .to(imageRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(
        titleRef.current,
        {
          color: "#BF2A13", // Un tono más cálido al hacer hover
          duration: 0.2,
          ease: "power1.out",
        },
        0,
      )
      .to(
        buttonRef.current,
        {
          backgroundColor: "#BF2A13",
          scale: 1.05,
          duration: 0.2,
          ease: "power1.out",
        },
        0,
      )

    // Eventos de mouse
    const handleMouseEnter = () => {
      if (!isActive && timelineRef.current) timelineRef.current.play()
    }

    const handleMouseLeave = () => {
      if (!isActive && timelineRef.current) timelineRef.current.reverse()
    }

    productRef.current.addEventListener("mouseenter", handleMouseEnter)
    productRef.current.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      if (productRef.current) {
        productRef.current.removeEventListener("mouseenter", handleMouseEnter)
        productRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [isActive])

  return (
    <div
      id={product.id}
      ref={productRef}
      className="product-item border border-[#570B0A]/20 p-6 cursor-pointer transition-all will-change-transform"
      onClick={onClick}
    >
      <h3 ref={titleRef} className="text-2xl font-bold text-[#570B0A] mb-4 font-display transition-colors">
        {product.name.toUpperCase()}
      </h3>
      <div ref={imageRef} className="aspect-square relative bg-white rounded-md overflow-hidden mb-4">
        {/* Optimized image with proper sizing */}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-4"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
        />
      </div>
      <div className="flex justify-between items-center">
        <span ref={priceRef} className="text-xl font-bold text-[#570B0A]">
          {product.price}
        </span>
        <button
          ref={buttonRef}
          className="bg-[#F2BC57] text-[#570B0A] px-4 py-2 rounded-md text-sm transition-colors hover:bg-[#F2BC57]/90"
        >
          Ver producto
        </button>
      </div>
    </div>
  )
}
