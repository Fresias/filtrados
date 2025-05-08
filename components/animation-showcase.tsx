"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BasicAnimation } from "./animations/basic-animation"
import { TimelineAnimation } from "./animations/timeline-animation"
import { ScrollAnimation } from "./animations/scroll-animation"
import { TextAnimation } from "./animations/text-animation"
import { HoverAnimation } from "./animations/hover-animation"

export function AnimationShowcase() {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    // Animate header on page load
    const headerAnimation = gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })

    return () => {
      // Clean up animations
      headerAnimation.kill()

      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div ref={headerRef} className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
          GSAP Animation Showcase
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Explore the power of GSAP animations in Next.js with these interactive examples
        </p>
      </div>

      <div className="space-y-32">
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Basic Animations</h2>
          <BasicAnimation />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Timeline Animations</h2>
          <TimelineAnimation />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Scroll Animations</h2>
          <ScrollAnimation />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Text Animations</h2>
          <TextAnimation />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Hover Animations</h2>
          <HoverAnimation />
        </section>
      </div>
    </div>
  )
}
