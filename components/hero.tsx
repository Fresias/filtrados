"use client"

// Este componente ya no se usa, lo mantenemos por si se necesita en el futuro
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Since we now have the intro animation, we can make this animation simpler
    tl.fromTo(".hero-button", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }).fromTo(
      ".scroll-indicator",
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4",
    )

    // Parallax effect on scroll
    gsap.to(textRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={heroRef}
      id="inicio"
      className="h-screen bg-[#FFEDCO] flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div ref={textRef} className="text-center z-10 px-4">
        <h1 className="hero-text text-[#570B0A] font-display">FILTRADOS</h1>
        <p className="text-[#570B0A] mt-4 text-xl max-w-md mx-auto font-body">Experiencia de café de especialidad</p>
        <Button className="mt-8 bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90 hero-button" size="lg">
          Nuestros Productos
        </Button>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <ArrowDown className="w-6 h-6 text-[#570B0A] animate-bounce" />
      </div>
    </div>
  )
}
