"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"

export function EnhancedTimelineAnimation() {
  const elementsRef = useRef<HTMLDivElement[]>([])
  const prefersReducedMotion = useReducedMotion()

  // Obtener los tokens de animación específicos para este componente
  const { duration, ease } = useAnimationTokens("timelineAnimation")

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }

  // Crear la animación usando el hook (pero no ejecutarla automáticamente)
  const animation = useGsapAnimation({
    type: "custom",
    target: elementsRef,
    customAnimation: (tl, targets) => {
      // Reset positions
      tl.set(targets, { clearProps: "all" })

      if (!prefersReducedMotion) {
        // Animación completa
        tl.from(targets[0], {
          x: -200,
          opacity: 0,
          duration: duration,
          ease: ease,
        })
          .from(
            targets[1],
            {
              y: 100,
              opacity: 0,
              duration: duration,
              ease: "back.out(1.7)",
            },
            "-=0.4",
          )
          .from(
            targets[2],
            {
              scale: 0,
              rotation: 180,
              opacity: 0,
              duration: duration,
              ease: "elastic.out(1, 0.3)",
            },
            "-=0.4",
          )
          .from(
            targets[3],
            {
              x: 200,
              opacity: 0,
              duration: duration,
              ease: ease,
            },
            "-=0.4",
          )
      } else {
        // Animación simplificada
        tl.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power1.out",
          },
        )
      }
    },
  })

  const playAnimation = () => {
    animation.restart()
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
          className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600"
          onClick={playAnimation}
        >
          Play Enhanced Timeline
        </Button>
      </div>
    </div>
  )
}
