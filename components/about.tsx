"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a timeline for better control and cleanup
    timelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    })

    // Use x/y transforms instead of position properties
    timelineRef.current
      .fromTo(textRef.current, { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
      .fromTo(imageRef.current, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.6")

    return () => {
      // Proper cleanup
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} id="sobre-nosotros" className="py-24 bg-[#FFEDCO]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div ref={textRef} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-[#570B0A] font-display">Nuestra Historia</h2>
            <p className="text-lg text-[#570B0A] font-body">
              Desde 2010, Café Aroma ha sido un refugio para los amantes del café. Comenzamos con una simple pasión:
              servir el mejor café de especialidad en un ambiente acogedor y auténtico.
            </p>
            <p className="text-lg text-[#570B0A] font-body">
              Seleccionamos cuidadosamente granos de las mejores regiones cafetaleras del mundo y trabajamos
              directamente con agricultores que comparten nuestra dedicación por la calidad y la sostenibilidad.
            </p>
            <p className="text-lg text-[#570B0A] font-body">
              Cada taza que servimos es el resultado de años de experiencia, atención al detalle y un profundo amor por
              el arte del café.
            </p>
          </div>
          <div ref={imageRef} className="relative h-[500px] rounded-lg overflow-hidden will-change-transform">
            {/* Optimized image with proper sizing */}
            <Image
              src="/placeholder.svg?key=hmu7j"
              alt="Café Aroma interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTiQAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
      </div>
    </section>
  )
}
