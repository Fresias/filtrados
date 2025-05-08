"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"

export function DepthEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const v60Ref = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Animación de flotación para el logo
    gsap.to(logoRef.current, {
      y: 10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animación de flotación para el V60
    gsap.to(v60Ref.current, {
      y: -10,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Animación de rotación sutil para el fondo
    gsap.to(backgroundRef.current, {
      rotation: 1,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    // Efecto parallax con el movimiento del mouse
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const mouseX = (clientX / window.innerWidth) * 2 - 1
      const mouseY = (clientY / window.innerHeight) * 2 - 1

      // Movimiento del fondo (lento)
      gsap.to(backgroundRef.current, {
        x: mouseX * 20,
        y: mouseY * 20,
        duration: 2,
        ease: "power1.out",
      })

      // Movimiento del logo (medio)
      gsap.to(logoRef.current, {
        x: mouseX * 40,
        duration: 1.5,
        ease: "power1.out",
      })

      // Movimiento del V60 (rápido)
      gsap.to(v60Ref.current, {
        x: mouseX * 60,
        y: v60Ref.current?.style.transform.includes("translateY")
          ? Number.parseFloat(v60Ref.current.style.transform.split("translateY(")[1]) + mouseY * 30
          : mouseY * 30,
        duration: 1,
        ease: "power1.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Animar la aparición de los iconos sociales
    gsap.fromTo(socialRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1 })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#FFEDCO]">
      {/* Fondo con patrón de granos de café */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-[120%] h-[120%] left-[-10%] top-[-10%] opacity-15"
        style={{
          backgroundImage: "url('/placeholder.svg?key=2qy4e')",
          backgroundSize: "500px 500px",
          backgroundRepeat: "repeat",
          transformOrigin: "center center",
        }}
      />

      {/* Logo FILTRADOS */}
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[600px] opacity-70"
      >
        <Image src="/placeholder.svg?key=da7ft" alt="FILTRADOS" width={800} height={200} className="w-full h-auto" />
      </div>

      {/* V60 en primer plano */}
      <div
        ref={v60Ref}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-[400px]"
      >
        <Image
          src="/placeholder.svg?key=tglgu"
          alt="V60 Coffee Dripper"
          width={500}
          height={500}
          className="w-full h-auto"
        />
      </div>

      {/* Redes sociales */}
      <div ref={socialRef} className="absolute bottom-8 right-8 flex space-x-4 z-10">
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-instagram"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        </a>
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        </a>
        <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/80 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-twitter"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
          </svg>
        </a>
      </div>
    </div>
  )
}
