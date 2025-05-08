"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function BasicAnimation() {
  const boxRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const triangleRef = useRef<HTMLDivElement>(null)
  // Store animation timelines in refs for proper cleanup
  const animationsRef = useRef<gsap.core.Timeline[]>([])

  const prefersReducedMotion = useReducedMotion()

  // Cleanup function to prevent memory leaks
  useEffect(() => {
    return () => {
      // Kill all animations on unmount
      animationsRef.current.forEach((tl) => tl.kill())
      animationsRef.current = []
    }
  }, [])

  const animateBox = () => {
    // Kill any existing animations on this element
    gsap.killTweensOf(boxRef.current)

    // Create a timeline for better control
    const tl = gsap.timeline()

    if (!prefersReducedMotion) {
      // Animación completa para usuarios sin preferencia de reducción de movimiento
      tl.to(boxRef.current, {
        x: 100, // Using x instead of left
        rotation: 180,
        backgroundColor: "#8b5cf6",
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      })
    } else {
      // Animación simplificada o instantánea para usuarios con preferencia de reducción de movimiento
      tl.to(boxRef.current, {
        x: 100,
        backgroundColor: "#8b5cf6",
        duration: 0.1, // Duración muy corta
        yoyo: true,
        repeat: 1,
      })
    }

    // Store the timeline for cleanup
    animationsRef.current.push(tl)
  }

  const animateCircle = () => {
    // Kill any existing animations on this element
    gsap.killTweensOf(circleRef.current)

    const tl = gsap.timeline()

    if (!prefersReducedMotion) {
      // Animación completa para usuarios sin preferencia de reducción de movimiento
      tl.to(circleRef.current, {
        scale: 1.5,
        y: -30, // Using y instead of top
        backgroundColor: "#ec4899",
        duration: 0.8,
        ease: "elastic.out(1, 0.3)",
        yoyo: true,
        repeat: 1,
      })
    } else {
      // Animación simplificada o instantánea para usuarios con preferencia de reducción de movimiento
      tl.to(circleRef.current, {
        scale: 1.5,
        y: -30,
        backgroundColor: "#ec4899",
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    // Store the timeline for cleanup
    animationsRef.current.push(tl)
  }

  const animateTriangle = () => {
    // Kill any existing animations on this element
    gsap.killTweensOf(triangleRef.current)

    const tl = gsap.timeline()

    if (!prefersReducedMotion) {
      tl.to(triangleRef.current, {
        rotation: 360,
        y: 50, // Using y instead of top
        opacity: 0.5,
        duration: 1.2,
        ease: "back.inOut(1.7)",
        yoyo: true,
        repeat: 1,
      })
    } else {
      tl.to(triangleRef.current, {
        rotation: 360,
        y: 50,
        opacity: 0.5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }

    // Store the timeline for cleanup
    animationsRef.current.push(tl)
  }

  const animateAll = () => {
    // Create a single timeline for all animations
    const masterTl = gsap.timeline()

    // Add all animations to the master timeline
    // This ensures they're properly sequenced and managed together
    masterTl
      .add(animateBox())
      .add(animateCircle(), "-=0.8") // Start slightly before previous animation ends
      .add(animateTriangle(), "-=0.8")

    // Store the master timeline for cleanup
    animationsRef.current.push(masterTl)
  }

  return (
    <div className="bg-slate-800 rounded-xl p-8 shadow-xl">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
        <div ref={boxRef} className="w-24 h-24 bg-emerald-500 rounded-md cursor-pointer" onClick={animateBox} />
        <div ref={circleRef} className="w-24 h-24 bg-sky-500 rounded-full cursor-pointer" onClick={animateCircle} />
        <div
          ref={triangleRef}
          className="w-0 h-0 border-l-[50px] border-l-transparent border-b-[86px] border-b-amber-500 border-r-[50px] border-r-transparent cursor-pointer"
          onClick={animateTriangle}
        />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={animateAll}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          Animate All
        </Button>
      </div>
    </div>
  )
}
