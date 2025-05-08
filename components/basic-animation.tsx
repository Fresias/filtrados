"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"

const BasicAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const box1Ref = useRef<HTMLDivElement>(null)
  const box2Ref = useRef<HTMLDivElement>(null)
  const box3Ref = useRef<HTMLDivElement>(null)

  // Crear referencias a las animaciones para limpiarlas adecuadamente
  const animationsRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    // Limpieza de animaciones anteriores
    return () => {
      animationsRef.current.forEach((anim) => anim.kill())
      animationsRef.current = []
    }
  }, [])

  const animateBox = (boxRef: React.RefObject<HTMLDivElement>) => {
    // Limpiar animaciones previas en este elemento
    gsap.killTweensOf(boxRef.current)

    // Primera animación: movimiento y rotación
    const anim1 = gsap.to(boxRef.current, {
      x: 100,
      rotation: 180,
      backgroundColor: "#8b5cf6",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Segunda animación: escala y opacidad
        const anim2 = gsap.to(boxRef.current, {
          scale: 1.2,
          opacity: 0.5,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => {
            // Animación de retorno
            const anim3 = gsap.to(boxRef.current, {
              x: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              backgroundColor: "lightcoral",
              duration: 1,
              ease: "power2.inOut",
            })
            animationsRef.current.push(anim3)
          },
        })
        animationsRef.current.push(anim2)
      },
    })

    animationsRef.current.push(anim1)
  }

  const animateAll = () => {
    animateBox(box1Ref)
    animateBox(box2Ref)
    animateBox(box3Ref)
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="flex space-x-4 mb-4">
        <div
          ref={box1Ref}
          className="w-20 h-20 bg-red-500 rounded cursor-pointer"
          onClick={() => animateBox(box1Ref)}
        />
        <div
          ref={box2Ref}
          className="w-20 h-20 bg-green-500 rounded cursor-pointer"
          onClick={() => animateBox(box2Ref)}
        />
        <div
          ref={box3Ref}
          className="w-20 h-20 bg-blue-500 rounded cursor-pointer"
          onClick={() => animateBox(box3Ref)}
        />
      </div>
      <Button
        onClick={animateAll}
        className="bg-gradient-to-r from-[#045951] to-[#045951]/80 hover:from-[#045951]/90 hover:to-[#045951]/70"
      >
        Animate All
      </Button>
    </div>
  )
}

export default BasicAnimation
