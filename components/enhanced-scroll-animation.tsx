"use client"

import { useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"

export function EnhancedScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement[]>([])
  const prefersReducedMotion = useReducedMotion()

  // Obtener los tokens de animación específicos para este componente
  const { duration, ease, stagger } = useAnimationTokens("scrollAnimation")

  // Monitorear el rendimiento
  useAnimationPerformance("EnhancedScrollAnimation", true)

  const addToBoxesRef = (el: HTMLDivElement) => {
    if (el && !boxesRef.current.includes(el)) {
      boxesRef.current.push(el)
    }
  }

  // Configurar la animación de scroll usando el hook
  useGsapAnimation({
    type: "custom",
    target: boxesRef,
    trigger: sectionRef,
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    customAnimation: (tl, targets) => {
      if (!prefersReducedMotion) {
        // Animación completa
        tl.fromTo(
          targets,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: duration,
            stagger: stagger,
            ease: ease,
          },
        )
      } else {
        // Animación simplificada
        tl.fromTo(
          targets,
          { opacity: 0.8 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: "power1.out",
          },
        )
      }
    },
  })

  return (
    <div ref={sectionRef} className="bg-slate-800 rounded-xl p-8 shadow-xl">
      <p className="text-center text-slate-300 mb-8">Scroll down to see the enhanced animations</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { color: "bg-gradient-to-br from-purple-500 to-indigo-600", title: "Enhanced Item 1" },
          { color: "bg-gradient-to-br from-blue-500 to-cyan-600", title: "Enhanced Item 2" },
          { color: "bg-gradient-to-br from-emerald-500 to-green-600", title: "Enhanced Item 3" },
          { color: "bg-gradient-to-br from-amber-500 to-yellow-600", title: "Enhanced Item 4" },
        ].map((item, index) => (
          <div
            key={index}
            ref={addToBoxesRef}
            className={`${item.color} rounded-lg p-6 h-64 flex items-center justify-center shadow-lg will-change-transform`}
          >
            <h3 className="text-2xl font-bold text-white">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
