"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function TimelineAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Limpiar referencias previas
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  const playAnimation = () => {
    // Limpiar timeline anterior si existe
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Crear un nuevo timeline
    timelineRef.current = gsap.timeline()

    // Reset positions
    gsap.set(elementsRef.current, { clearProps: "all" })

    if (!prefersReducedMotion) {
      // Animación completa para usuarios sin preferencia de reducción de movimiento
      timelineRef.current
        .from(elementsRef.current[0], {
          x: -200,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        })
        .from(
          elementsRef.current[1],
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4",
        )
        .from(
          elementsRef.current[2],
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.4",
        )
        .from(
          elementsRef.current[3],
          {
            x: 200,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4",
        )
    } else {
      // Animación simplificada para usuarios con preferencia de reducción de movimiento
      // Mostrar todos los elementos con una simple transición de opacidad
      timelineRef.current.fromTo(
        elementsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power1.out",
        },
      )
    }
  }

  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-xl">
      <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
        <div ref={addToRefs} className="w-20 h-20 bg-rose-500 rounded-md" />
        <div ref={addToRefs} className="w-20 h-20 bg-amber-500 rounded-full" />
        <div ref={addToRefs} className="w-20 h-20 bg-emerald-500 rounded-md rotate-45" />
        <div ref={addToRefs} className="w-20 h-20 bg-sky-500 rounded-md" />
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 timeline-play-button"
          onClick={playAnimation}
        >
          Play Timeline
        </Button>
      </div>
    </div>
  )
}
