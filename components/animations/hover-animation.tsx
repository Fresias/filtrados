"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Zap, Star, Heart, ArrowRight } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function HoverAnimation() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  // Store timelines for proper cleanup
  const timelinesRef = useRef<gsap.core.Timeline[]>([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Set up hover animations for each card
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const icon = card.querySelector(".icon")
      const title = card.querySelector(".title")
      const arrow = card.querySelector(".arrow")

      // Create a timeline but don't play it yet
      const tl = gsap.timeline({ paused: true })

      if (!prefersReducedMotion) {
        // Animación completa para usuarios sin preferencia de reducción de movimiento
        tl.to(card, {
          y: -10, // Use y instead of top
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
          ease: "power2.out",
        })
          .to(
            icon,
            {
              scale: 1.2,
              rotation: 5,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            0,
          )
          .to(
            title,
            {
              x: 5, // Use x instead of left
              duration: 0.3,
              ease: "power2.out",
            },
            0,
          )
          .to(
            arrow,
            {
              x: 5, // Use x instead of left
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            0,
          )
      } else {
        // Animación simplificada para usuarios con preferencia de reducción de movimiento
        // Solo cambiar opacidad y color sin movimiento
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

      // Store timeline for cleanup
      timelinesRef.current.push(tl)

      // Add event listeners to play/reverse the timeline
      const handleMouseEnter = () => tl.play()
      const handleMouseLeave = () => tl.reverse()

      card.addEventListener("mouseenter", handleMouseEnter)
      card.addEventListener("mouseleave", handleMouseLeave)

      // Store event listeners for cleanup
      card._gsapListeners = {
        enter: handleMouseEnter,
        leave: handleMouseLeave,
      }
    })

    return () => {
      // Kill all timelines
      timelinesRef.current.forEach((tl) => tl.kill())

      // Remove event listeners
      cardsRef.current.forEach((card) => {
        if (card && card._gsapListeners) {
          card.removeEventListener("mouseenter", card._gsapListeners.enter)
          card.removeEventListener("mouseleave", card._gsapListeners.leave)
        }
      })
    }
  }, [prefersReducedMotion])

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
