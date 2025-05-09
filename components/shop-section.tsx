"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProductItem } from "./product-item"
import Image from "next/image"
import { getAllProducts } from "@/data/products"
import type { Product } from "@/types/product"

export function ShopSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const centerColumnRef = useRef<HTMLDivElement>(null)
  const leftColumnRef = useRef<HTMLDivElement>(null)
  const rightColumnRef = useRef<HTMLDivElement>(null)
  const [activeProduct, setActiveProduct] = useState<string | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Use matchMedia for responsive animations
    const mm = gsap.matchMedia()

    // Store all animations and ScrollTriggers for cleanup
    const animations: gsap.core.Tween[] = []
    const scrollTriggers = []

    // Animations for all screen sizes
    mm.add("all", () => {
      // Animación inicial del título - use transform instead of position properties
      const titleAnim = gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 }, // Use y instead of top
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        },
      )
      animations.push(titleAnim)

      // Animación de entrada para la cuadrícula de productos - batch for better performance
      const productsAnim = gsap.fromTo(
        ".product-item",
        { opacity: 0, y: 30 }, // Use y instead of top
        {
          opacity: 1,
          y: 0,
          stagger: {
            each: 0.15,
            from: "start",
            grid: "auto",
          },
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        },
      )
      animations.push(productsAnim)

      return () => {
        // Cleanup will be handled in the main return
      }
    })

    // Desktop-specific animations
    mm.add("(min-width: 768px)", () => {
      // Efecto parallax en scroll - Versión intensificada
      if (centerColumnRef.current && leftColumnRef.current && rightColumnRef.current) {
        // Configuración para la columna central (se mueve hacia arriba)
        const centerAnim = gsap.to(centerColumnRef.current, {
          yPercent: -25, // Movimiento hacia arriba más intenso
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        animations.push(centerAnim)

        // Configuración para las columnas laterales (se mueven hacia abajo)
        const sideAnim = gsap.to([leftColumnRef.current, rightColumnRef.current], {
          yPercent: 15, // Movimiento hacia abajo más intenso
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })
        animations.push(sideAnim)
      }

      return () => {
        // Cleanup will be handled in the main return
      }
    })

    // Mobile-specific animations - simpler for better performance
    mm.add("(max-width: 767px)", () => {
      // Simplified animations for mobile
      const mobileAnim = gsap.fromTo(
        ".product-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      )
      animations.push(mobileAnim)

      return () => {
        // Cleanup will be handled in the main return
      }
    })

    // Limpiar animaciones
    return () => {
      // Kill all animations
      animations.forEach((anim) => anim.kill())

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      // Revert matchMedia
      mm.revert()
    }
  }, [])

  const handleProductClick = (productId: string) => {
    setActiveProduct(activeProduct === productId ? null : productId)
  }

  const products = getAllProducts()

  // Función para distribuir productos en columnas
  // Si no es múltiplo de 3, prioriza la columna central
  const distributeProducts = (products: Product[]) => {
    const leftColumn = []
    const centerColumn = []
    const rightColumn = []

    // Calcular cuántos productos van en cada columna
    const totalProducts = products.length
    const remainder = totalProducts % 3

    // Distribuir productos base (múltiplos de 3)
    const basePerColumn = Math.floor(totalProducts / 3)

    // Distribuir productos adicionales priorizando el centro
    let leftCount = basePerColumn
    let centerCount = basePerColumn
    const rightCount = basePerColumn

    if (remainder === 1) {
      centerCount += 1 // Si sobra 1, va al centro
    } else if (remainder === 2) {
      centerCount += 1 // Si sobran 2, uno va al centro
      leftCount += 1 // y otro a la izquierda
    }

    // Llenar las columnas según los conteos calculados
    let index = 0

    // Llenar columna izquierda
    for (let i = 0; i < leftCount; i++) {
      leftColumn.push(products[index++])
    }

    // Llenar columna central
    for (let i = 0; i < centerCount; i++) {
      centerColumn.push(products[index++])
    }

    // Llenar columna derecha
    for (let i = 0; i < rightCount; i++) {
      rightColumn.push(products[index++])
    }

    return { leftColumn, centerColumn, rightColumn }
  }

  const { leftColumn, centerColumn, rightColumn } = distributeProducts(products)

  return (
    <section ref={sectionRef} className="bg-[#FFEDCO] py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-center text-[#570B0A] mb-16 font-display">
          TIENDA OFICIAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#570B0A]/20">
          {/* Columna izquierda */}
          <div ref={leftColumnRef} className="flex flex-col">
            {leftColumn.map((product) => (
              <ProductItem
                key={product.id}
                product={{ ...product, price: product.formattedPrice }}
                isActive={activeProduct === product.id}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>

          {/* Columna central */}
          <div ref={centerColumnRef} className="flex flex-col">
            {/* Logo central - solo si hay productos en la columna central */}
            {centerColumn.length > 0 && (
              <div className="product-item flex items-center justify-center p-8 border border-[#570B0A]/20 aspect-square">
                <div className="w-full max-w-[200px]">
                 
                </div>
              </div>
            )}

            {/* Productos de la columna central */}
            {centerColumn.map((product) => (
              <ProductItem
                key={product.id}
                product={{ ...product, price: product.formattedPrice }}
                isActive={activeProduct === product.id}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>

          {/* Columna derecha */}
          <div ref={rightColumnRef} className="flex flex-col">
            {rightColumn.map((product) => (
              <ProductItem
                key={product.id}
                product={{ ...product, price: product.formattedPrice }}
                isActive={activeProduct === product.id}
                onClick={() => handleProductClick(product.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal para detalles del producto */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#FFEDCO] p-8 max-w-2xl w-full rounded-lg relative">
            <button
              className="absolute top-4 right-4 text-[#570B0A] text-2xl font-bold"
              onClick={() => setActiveProduct(null)}
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <div className="aspect-square relative bg-white rounded-md overflow-hidden">
                  {/* Optimized image with proper sizing */}
                  <Image
                    src={products.find((p) => p.id === activeProduct)?.image || "/placeholder.svg"}
                    alt={products.find((p) => p.id === activeProduct)?.name || ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-4"
                    loading="eager" // Load immediately since it's the main modal content
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-[#570B0A] mb-2">
                  {products.find((p) => p.id === activeProduct)?.name}
                </h3>
                <p className="text-xl font-bold text-[#570B0A] mb-4">
                  {products.find((p) => p.id === activeProduct)?.price}
                </p>
                <p className="text-[#570B0A] mb-6">{products.find((p) => p.id === activeProduct)?.description}</p>
                <button className="bg-[#F2BC57] text-[#570B0A] px-6 py-3 rounded-md flex items-center gap-2 hover:bg-[#F2BC57]/90 transition-colors">
                  <span>Añadir al carrito</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
