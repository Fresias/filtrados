"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"

const TimelineAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Función para añadir elementos al array de referencias
  const addToItemsRef = (el: HTMLDivElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Registrar ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Configurar ScrollTrigger para inicializar la animación cuando el componente sea visible
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => initializeTimeline(),
      onLeaveBack: () => {
        // Opcional: revertir la animación cuando se sale de la vista
        if (timelineRef.current) {
          timelineRef.current.progress(0).kill()
          timelineRef.current = null
        }
      },
    })

    // Limpieza
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [])

  const initializeTimeline = () => {
    // Si ya existe un timeline, lo matamos para evitar duplicados
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Crear un nuevo timeline
    timelineRef.current = gsap.timeline()

    // Añadir animaciones al timeline
    timelineRef.current.fromTo(
      itemsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out",
      },
    )
  }

  const playAnimation = () => {
    // Si ya existe un timeline, lo reiniciamos
    if (timelineRef.current) {
      timelineRef.current.restart()
    } else {
      // Si no existe, lo inicializamos
      initializeTimeline()
    }
  }

  const timelineItems = [
    { year: 2010, description: "Founded the company with a vision to revolutionize the industry." },
    { year: 2012, description: "Launched our first product, gaining initial traction in the market." },
    { year: 2015, description: "Expanded our team and secured Series A funding to fuel growth." },
    { year: 2018, description: "Achieved significant market share and established ourselves as a key player." },
    {
      year: 2020,
      description: "Navigated challenges during the pandemic and emerged stronger with innovative solutions.",
    },
    { year: 2023, description: "Celebrating over a decade of innovation and continued success." },
  ]

  return (
    <div ref={containerRef} className="relative w-full h-full py-16">
      <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 transform -translate-x-1/2"></div>
      <div className="container mx-auto">
        <div className="flex flex-col gap-8">
          {timelineItems.map((item, index) => (
            <div key={index} ref={addToItemsRef} className="flex items-center w-full opacity-0">
              <div className="w-1/2 text-right pr-8">
                <h3 className="text-xl font-semibold">{item.year}</h3>
              </div>
              <div className="w-1/2 text-left pl-8">
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            onClick={playAnimation}
            className="bg-gradient-to-r from-[#045951] to-[#045951]/80 hover:from-[#045951]/90 hover:to-[#045951]/70"
          >
            Play Timeline
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TimelineAnimation
