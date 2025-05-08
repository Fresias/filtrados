"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

export function TextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const charsRef = useRef<HTMLSpanElement[]>([])
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Function to add characters to the reference array
  const addToCharsRef = (el: HTMLSpanElement | null) => {
    if (el && !charsRef.current.includes(el)) {
      charsRef.current.push(el)
    }
  }

  useEffect(() => {
    // Use Intersection Observer for better performance than scroll events
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    // Cleanup
    return () => {
      observer.disconnect()
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [])

  useEffect(() => {
    // Only initialize when the component is visible
    if (isVisible && textRef.current) {
      // Split text into characters
      const text = "This is an animated text!"
      textRef.current.innerHTML = ""

      // Create all spans at once and batch DOM operations
      const fragment = document.createDocumentFragment()

      text.split("").forEach((char) => {
        const span = document.createElement("span")
        span.innerText = char === " " ? "\u00A0" : char
        span.className = "inline-block"
        fragment.appendChild(span)
        addToCharsRef(span)
      })

      // Append all spans at once for better performance
      textRef.current.appendChild(fragment)
    }
  }, [isVisible])

  const animateText = () => {
    // Clean up previous animation
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create new timeline
    timelineRef.current = gsap.timeline()

    // Use batch animation for better performance
    timelineRef.current.fromTo(
      charsRef.current,
      { y: 0, opacity: 1, scale: 1 },
      {
        y: -20,
        opacity: 0,
        scale: 0.5,
        stagger: {
          each: 0.03,
          from: "start",
          grid: "auto",
        },
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
        repeatDelay: 0.2,
      },
    )
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div ref={textRef} className="text-4xl font-bold text-gray-800 min-h-[60px] will-change-transform">
        {!isVisible && "This is an animated text!"}
      </div>

      <Button
        onClick={animateText}
        className="bg-gradient-to-r from-[#045951] to-[#045951]/80 hover:from-[#045951]/90 hover:to-[#045951]/70 mt-8"
        disabled={!isVisible}
      >
        Animate Text
      </Button>
    </div>
  )
}
