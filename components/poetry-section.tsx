"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function PoetrySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const poemRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement[]>([])
  const prefersReducedMotion = useReducedMotion()

  const addToLinesRef = (el: HTMLDivElement) => {
    if (el && !linesRef.current.includes(el)) {
      linesRef.current.push(el)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animación de entrada para el poema
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    })

    // Animar cada línea del poema con un efecto de aparición secuencial
    if (!prefersReducedMotion) {
      // Animación completa para usuarios sin preferencia de reducción de movimiento
      linesRef.current.forEach((line, index) => {
        tl.fromTo(
          line,
          {
            opacity: 0,
            y: 20,
            x: index % 2 === 0 ? -20 : 0, // Desplazamiento horizontal alternado para las líneas principales
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          index * 0.15, // Retraso escalonado
        )
      })

      // Efecto parallax para el fondo del poema
      gsap.to(poemRef.current, {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      })
    } else {
      // Animación simplificada para usuarios con preferencia de reducción de movimiento
      // Mostrar todas las líneas con una simple transición de opacidad
      tl.fromTo(
        linesRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power1.out",
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} className="py-16 bg-[#570B0A]">
      <div className="container mx-auto px-4">
        <div ref={poemRef} className="max-w-3xl mx-auto text-[#F2BC57] font-body space-y-8">
          <div className="space-y-2">
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium">
              Momentos que nos transportan
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              a ese café de la nona,
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-16">
              a esa cafetera que descansaba
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              en la esquina de la cocina.
            </div>
          </div>

          <div className="space-y-2">
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium">
              Aromas que despiertan recuerdos
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              de domingos en familia,
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-16">
              de charlas sinceras
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              y momentos simples.
            </div>
          </div>

          <div className="space-y-2">
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium">
              Creamos experiencias que conectan el ayer con el hoy,
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              que rescatan la autenticidad
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-16">
              y celebran los pequeños rituales.
            </div>
          </div>

          <div className="space-y-2">
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium">
              Un viaje sensorial a lo que fuimos
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-8">
              y lo que somos...
            </div>
            <div ref={addToLinesRef} className="text-xl md:text-2xl font-medium ml-16">
              ¡Siempre cerca de ti!
            </div>
          </div>

          <div ref={addToLinesRef} className="text-2xl md:text-3xl font-bold text-center mt-12 text-[#F2BC57]">
            Memoria y sentidos.
          </div>
        </div>
      </div>
    </section>
  )
}
