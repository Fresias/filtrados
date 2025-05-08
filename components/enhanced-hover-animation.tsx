"use client"

import { useEffect, useRef } from "react"
import { Zap, Star, Heart, ArrowRight } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import gsap from "gsap"

export function EnhancedHoverAnimation() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()

  // Obtener los tokens de animación específicos para este componente
  const { duration, ease } = useAnimationTokens("hoverAnimation")

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const icon = card.querySelector(".icon")
      const title = card.querySelector(".title")
      const arrow = card.querySelector(".arrow")

      const tl = gsap.timeline({ paused: true })

      if (!prefersReducedMotion) {
        tl.to(card, {
          y: -10,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
          duration: duration,
          ease: ease,
        })
          .to(
            icon,
            {
              scale: 1.2,
              rotation: 5,
              duration: duration,
              ease: "back.out(1.7)",
            },
            0,
          )
          .to(
            title,
            {
              x: 5,
              duration: duration,
              ease: ease,
            },
            0,
          )
          .to(
            arrow,
            {
              x: 5,
              opacity: 1,
              duration: duration,
              ease: ease,
            },
            0,
          )
      } else {
        tl.to(card, {
          boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          duration: 0.2,
        }).to(
          arrow,
          {
            opacity: 1,
            duration: 0.2,
          },
          0,
        )
      }

      const handleMouseEnter = () => tl.play()
      const handleMouseLeave = () => tl.reverse()

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        card.removeEventListener("mouseenter", handleMouseEnter)
        card.removeEventListener("mouseleave", handleMouseLeave)
        tl.kill()
      }
    })
  }, [prefersReducedMotion, duration, ease])

  const cards = [
    {
      icon: <Zap className="size-8 text-amber-500" />,
      title: "Fast Performance",
      description: "Optimized animations that run at 60fps",
    },
    {
      icon: <Star className="size-8 text-purple-500" />,
      title: "Easy to Use",
      description: "Simple API for complex animations",
    },
    {
      icon: <Heart className="size-8 text-rose-500" />,
      title: "Loved by Devs",
      description: "The most popular animation library",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          ref={(el) => (cardsRef.current[index] = el)}
          className="bg-slate-800 rounded-xl p-6 shadow-lg cursor-pointer transition-colors hover:bg-slate-700/80 will-change-transform"
        >
          <div className="icon mb-4">{card.icon}</div>
          <h3 className="title text-xl font-bold mb-2">{card.title}</h3>
          <p className="text-slate-300 mb-4">{card.description}</p>
          <div className="flex items-center text-slate-300">
            <span>Learn more</span>
            <ArrowRight className="arrow ml-2 opacity-0 size-4" />
          </div>
        </div>
      ))}
    </div>
  )
}
