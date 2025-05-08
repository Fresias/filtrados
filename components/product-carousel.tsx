"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react"
import Image from "next/image"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"

export function ProductCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Obtener tokens de animación específicos para este componente
  const { duration, ease, stagger, delay } = useAnimationTokens("productCarousel")

  // Monitorear el rendimiento de esta animación crítica
  useAnimationPerformance("ProductCarousel", true)

  const addToCardsRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  // Productos definidos fuera del useEffect para evitar recreaciones
  const products = [
    {
      name: "V60 Pour Over",
      description: "Cafetera de goteo para una extracción perfecta",
      price: "$45.99",
      image: "/placeholder.svg?key=qs604",
    },
    {
      name: "Pava Eléctrica Gooseneck",
      description: "Control preciso de temperatura y flujo de agua",
      price: "$79.99",
      image: "/placeholder.svg?key=ihka3",
    },
    {
      name: "Jarra de Café",
      description: "Elegante jarra para servir café recién preparado",
      price: "$32.50",
      image: "/placeholder.svg?key=k6l5o",
    },
  ]

  // Usar IntersectionObserver para detectar visibilidad
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Configurar animaciones cuando el componente sea visible
  useEffect(() => {
    if (!isVisible) return

    gsap.registerPlugin(ScrollTrigger)

    // Determinar la configuración de animación basada en prefers-reduced-motion
    const fromY = prefersReducedMotion ? 0 : 50
    const fromOpacity = prefersReducedMotion ? 0.8 : 0
    const animDuration = prefersReducedMotion ? 0.3 : duration
    const animStagger = prefersReducedMotion ? 0.05 : stagger
    const animDelay = prefersReducedMotion ? 0 : delay

    // Crear un único timeline para todas las animaciones
    const mainTl = gsap.timeline()

    // Animar el título
    mainTl.fromTo(
      titleRef.current,
      { y: fromY, opacity: fromOpacity },
      {
        y: 0,
        opacity: 1,
        duration: animDuration,
        ease: ease,
      },
    )

    // Animar las tarjetas de productos
    mainTl.fromTo(
      cardsRef.current,
      { y: fromY, opacity: fromOpacity },
      {
        y: 0,
        opacity: 1,
        stagger: animStagger,
        duration: animDuration,
        ease: ease,
        clearProps: "opacity,y", // Limpiar propiedades después de la animación
      },
      animDelay, // Retraso después de la animación del título
    )

    // Optimizar para rendimiento
    if (titleRef.current) {
      titleRef.current.style.willChange = "transform, opacity"
    }

    cardsRef.current.forEach((card) => {
      card.style.willChange = "transform, opacity"
    })

    return () => {
      // Limpiar ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      // Limpiar will-change para liberar recursos
      if (titleRef.current) {
        titleRef.current.style.willChange = "auto"
      }

      cardsRef.current.forEach((card) => {
        card.style.willChange = "auto"
      })

      // Limpiar timeline
      mainTl.kill()
    }
  }, [isVisible, prefersReducedMotion, duration, ease, stagger, delay])

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    }
  }

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      })
    }
  }

  return (
    <section ref={sectionRef} id="productos" className="py-24 bg-[#FFEDCO]">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center text-[#570B0A] mb-16 carousel-title font-display"
          style={{ opacity: 0 }} // Inicialmente oculto para la animación
        >
          Nuestros Productos
        </h2>

        <div className="relative">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#F2BC57] text-[#570B0A] p-2 rounded-full shadow-lg md:flex hidden"
            aria-label="Anterior producto"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch", // Mejorar rendimiento en iOS
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                ref={addToCardsRef}
                className="min-w-[300px] md:min-w-[350px] snap-center"
                style={{ opacity: 0 }} // Inicialmente oculto para la animación
              >
                <Card className="h-full border-none shadow-lg overflow-hidden bg-white">
                  <div className="relative h-64 bg-[#FFEDCO]">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                      loading={index === 0 ? "eager" : "lazy"} // Solo cargar inmediatamente el primer producto
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#570B0A] mb-2 font-display">{product.name}</h3>
                    <p className="text-[#570B0A] font-body">{product.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-6 pt-0">
                    <span className="text-2xl font-bold text-[#570B0A]">{product.price}</span>
                    <Button className="bg-[#F2BC57] hover:bg-[#F2BC57]/90 text-[#570B0A]">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Comprar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#F2BC57] text-[#570B0A] p-2 rounded-full shadow-lg md:flex hidden"
            aria-label="Siguiente producto"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
