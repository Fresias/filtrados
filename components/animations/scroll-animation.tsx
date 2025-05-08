"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"

export function ScrollAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement[]>([])
  // Store ScrollTrigger instances for proper cleanup
  const scrollTriggersRef = useRef<ScrollTrigger[]>([])

  const prefersReducedMotion = useReducedMotion()

  // Monitorear el rendimiento de esta animación crítica
  useAnimationPerformance("ScrollAnimation", true)

  const addToBoxesRef = (el: HTMLDivElement) => {
    if (el && !boxesRef.current.includes(el)) {
      boxesRef.current.push(el)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Use matchMedia for responsive animations
    const mm = gsap.matchMedia()

    // Set up different animations for different screen sizes
    mm.add("(min-width: 768px)", () => {
      // Desktop animations
      boxesRef.current.forEach((box, index) => {
        // Set initial state
        gsap.set(box, { y: prefersReducedMotion ? 0 : 100, opacity: prefersReducedMotion ? 0.8 : 0 })

        // Create ScrollTrigger
        const trigger = ScrollTrigger.create({
          trigger: box,
          start: "top bottom-=100",
          onEnter: () => {
            gsap.to(box, {
              y: 0,
              opacity: 1,
              duration: prefersReducedMotion ? 0.2 : 0.8,
              delay: prefersReducedMotion ? 0 : index * 0.1,
              ease: "power2.out",
            })
          },
          onLeaveBack: () => {
            if (!prefersReducedMotion) {
              gsap.to(box, {
                y: 100,
                opacity: 0,
                duration: 0.4,
              })
            }
          },
        })

        // Store for cleanup
        scrollTriggersRef.current.push(trigger)
      })

      // Return cleanup function for this media query
      return () => {
        // Cleanup will happen in the main return
      }
    })

    // Mobile animations - simpler for better performance
    mm.add("(max-width: 767px)", () => {
      // Use batch for better performance
      gsap.set(boxesRef.current, { y: prefersReducedMotion ? 0 : 50, opacity: prefersReducedMotion ? 0.8 : 0 })

      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        onEnter: () => {
          // Batch animations for better performance
          gsap.to(boxesRef.current, {
            y: 0,
            opacity: 1,
            duration: prefersReducedMotion ? 0.2 : 0.6,
            stagger: prefersReducedMotion ? 0 : 0.1,
            ease: "power2.out",
          })
        },
        onLeaveBack: () => {
          if (!prefersReducedMotion) {
            gsap.to(boxesRef.current, {
              y: 50,
              opacity: 0,
              duration: 0.3,
            })
          }
        },
      })

      scrollTriggersRef.current.push(trigger)

      return () => {
        // Cleanup will happen in the main return
      }
    })

    return () => {
      // Kill all ScrollTriggers
      scrollTriggersRef.current.forEach((trigger) => trigger.kill())
      // Clear the matchMedia context
      mm.revert()
    }
  }, [prefersReducedMotion])

  return (
    <div ref={sectionRef} className="bg-slate-800 rounded-xl p-8 shadow-xl">
      <p className="text-center text-slate-300 mb-8">Scroll down to see the animations</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { color: "bg-gradient-to-br from-purple-500 to-indigo-600", title: "Scroll Item 1" },
          { color: "bg-gradient-to-br from-blue-500 to-cyan-600", title: "Scroll Item 2" },
          { color: "bg-gradient-to-br from-emerald-500 to-green-600", title: "Scroll Item 3" },
          { color: "bg-gradient-to-br from-amber-500 to-yellow-600", title: "Scroll Item 4" },
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
