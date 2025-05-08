"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"

export function SectionsNavigation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement[]>([])
  const hoverTimelinesRef = useRef<Map<HTMLDivElement, gsap.core.Timeline>>(new Map())
  const [isInitialized, setIsInitialized] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Obtener tokens de animación específicos para este componente
  const { duration, ease, stagger } = useAnimationTokens("sectionNavigation")

  // Monitorear el rendimiento
  useAnimationPerformance("SectionsNavigation", true)

  const addToSectionsRef = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el)
    }
  }

  // Secciones definidas fuera del useEffect para evitar recreaciones
  const sections = [
    {
      title: "APRENDE",
      image: "/aprende600x900.jpg",
      link: "/aprende",
    },
    {
      title: "INSPÍRATE",
      image: "/inspirate600x900.jpg",
      link: "/inspirate",
    },
    {
      title: "EXPERIENCIA",
      image: "/experiencia600x900.jpg",
      link: "/experiencia",
    },
    {
      title: "TIENDA",
      image: "/tienda600x900.jpg",
      link: "/tienda",
    },
  ]

  // Efecto para inicializar las animaciones
  useEffect(() => {
    // Registrar ScrollTrigger inmediatamente
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    // Forzar la creación inmediata de los elementos DOM
    const forceRender = () => {
      if (sectionRef.current) {
        // Forzar un reflow
        void sectionRef.current.offsetHeight
      }
    }
    forceRender()

    // Determinar la configuración de animación basada en prefers-reduced-motion
    const fromOpacity = prefersReducedMotion ? 0.9 : 0.5
    const fromY = prefersReducedMotion ? 0 : 20
    const animDuration = prefersReducedMotion ? 0.3 : duration
    const animStagger = prefersReducedMotion ? 0.05 : stagger

    // Crear un único timeline para todas las animaciones de entrada
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%", // Comienza antes de llegar a la vista
        toggleActions: "play none none none",
      },
    })

    // Añadir todas las secciones al timeline con stagger
    entranceTl.fromTo(
      sectionsRef.current,
      { opacity: fromOpacity, y: fromY },
      {
        opacity: 1,
        y: 0,
        stagger: animStagger,
        duration: animDuration,
        ease: ease,
        clearProps: "opacity,y", // Limpiar propiedades después de la animación
      },
    )

    // Configurar animaciones de hover para cada sección
    sectionsRef.current.forEach((section) => {
      // Obtener elementos dentro de la sección
      const image = section.querySelector(".section-image")
      const title = section.querySelector(".section-title")
      const titleText = section.querySelector(".section-title-text")
      const arrow = section.querySelector(".section-arrow")

      // Crear timeline para hover
      const hoverTl = gsap.timeline({ paused: true })

      // Configurar animación según preferencia de reducción de movimiento
      if (!prefersReducedMotion) {
        hoverTl
          .to(image, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          })
          .to(
            title,
            {
              backgroundColor: "#570B0A",
              duration: 0.3,
            },
            0,
          )
          .to(
            titleText,
            {
              color: "#F2BC57",
              duration: 0.3,
            },
            0,
          )
          .to(
            arrow,
            {
              x: 5,
              color: "#F2BC57",
              duration: 0.3,
              ease: "power2.out",
            },
            0,
          )
      } else {
        // Animación simplificada
        hoverTl
          .to(title, {
            backgroundColor: "#570B0A",
            duration: 0.2,
          })
          .to(
            titleText,
            {
              color: "#F2BC57",
              duration: 0.2,
            },
            0,
          )
          .to(
            arrow,
            {
              color: "#F2BC57",
              duration: 0.2,
            },
            0,
          )
      }

      // Guardar el timeline en el Map para limpieza posterior
      hoverTimelinesRef.current.set(section, hoverTl)

      // Añadir event listeners
      const handleMouseEnter = () => hoverTl.play()
      const handleMouseLeave = () => hoverTl.reverse()

      section.addEventListener("mouseenter", handleMouseEnter)
      section.addEventListener("mouseleave", handleMouseLeave)

      // Guardar referencias a los event listeners para limpieza
      section._gsapListeners = {
        enter: handleMouseEnter,
        leave: handleMouseLeave,
      }
    })

    // Marcar como inicializado
    setIsInitialized(true)

    return () => {
      // Limpiar ScrollTrigger
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

      // Limpiar timelines de hover
      hoverTimelinesRef.current.forEach((timeline) => timeline.kill())
      hoverTimelinesRef.current.clear()

      // Limpiar event listeners
      sectionsRef.current.forEach((section) => {
        if (section && section._gsapListeners) {
          section.removeEventListener("mouseenter", section._gsapListeners.enter)
          section.removeEventListener("mouseleave", section._gsapListeners.leave)
          delete section._gsapListeners
        }
      })
    }
  }, [prefersReducedMotion, duration, ease, stagger])

  // Renderizar las barras de título primero, antes que las imágenes
  return (
    <section
      ref={sectionRef}
      className="py-0 bg-[#570B0A]"
      style={{ willChange: "transform", contain: "content" }} // Optimizaciones de rendimiento
    >
      <div className="container-fluid mx-auto px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {sections.map((section, index) => (
            <div
              key={index}
              ref={addToSectionsRef}
              className="overflow-hidden border-4 border-[#570B0A]"
              style={{
                outline: "1px solid rgba(242, 188, 87, 0.2)",
                willChange: "transform", // Optimización de rendimiento
                contain: "layout paint style", // Optimización de rendimiento
              }}
            >
              <Link href={section.link} className="block">
                {/* Renderizar primero la barra de título */}
                <div
                  className="section-title bg-[#F2BC57] py-8 px-6 flex justify-between items-center"
                  style={{ willChange: "transform", contain: "layout paint style" }}
                >
                  <h2 className="section-title-text text-3xl md:text-5xl font-bold font-display text-[#570B0A]">
                    {section.title}
                  </h2>
                  <ArrowRight className="section-arrow h-8 w-8 text-[#570B0A]" />
                </div>

                {/* Contenedor de imagen con placeholder de color */}
                <div
                  className="relative h-[500px] md:h-[650px] overflow-hidden bg-[#570B0A]/50"
                  style={{ willChange: "transform" }}
                >
                  <Image
                    src={section.image || "/placeholder.svg"}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover section-image transition-transform"
                    priority={index < 2} // Priorizar solo las primeras dos imágenes
                    loading={index < 2 ? "eager" : "lazy"} // Carga inmediata solo para las primeras dos
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
