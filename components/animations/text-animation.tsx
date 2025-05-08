"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function TextAnimation() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const prefersReducedMotion = useReducedMotion()

  const addToCharsRef = (el: HTMLSpanElement) => {
    if (el && !charsRef.current.includes(el)) {
      charsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Split text into spans for character-by-character animation
    if (textRef.current) {
      const text = textRef.current.innerText
      textRef.current.innerHTML = ""

      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.innerText = char === " " ? "\u00A0" : char
        span.className = "inline-block"
        textRef.current?.appendChild(span)
        addToCharsRef(span)
      })
    }
  }, [])

  const animateText = () => {
    if (!prefersReducedMotion) {
      // Animación completa
      gsap.fromTo(
        charsRef.current,
        { y: 0, opacity: 1, scale: 1 },
        {
          y: -20,
          opacity: 0,
          scale: 0.5,
          stagger: 0.03,
          duration: 0.5,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          repeatDelay: 0.2,
        },
      )
    } else {
      // Animación simplificada para usuarios con preferencia de reducción de movimiento
      gsap.fromTo(
        charsRef.current,
        { opacity: 1 },
        {
          opacity: 0.5,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
        },
      )
    }
  }

  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-xl text-center">
      <h3
        ref={textRef}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent bg-clip-text"
      >
        Animate Each Character
      </h3>

      <Button
        onClick={animateText}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        Animate Text
      </Button>
    </div>
  )
}
