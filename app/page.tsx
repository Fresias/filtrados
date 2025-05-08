"use client"

import { useState, useEffect, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { SectionsNavigation } from "@/components/sections-navigation"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { IntroAnimation } from "@/components/intro-animation"
import { PoetrySection } from "@/components/poetry-section"
import { WordsCarousel } from "@/components/words-carousel"
import { StaticBackground } from "@/components/static-background"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Precarga de componentes críticos
  useEffect(() => {
    // Precarga inmediata de componentes críticos
    const preloadComponents = async () => {
      // Crear un div oculto para renderizar los componentes
      const preloadContainer = document.createElement("div")
      preloadContainer.style.position = "absolute"
      preloadContainer.style.width = "1px"
      preloadContainer.style.height = "1px"
      preloadContainer.style.overflow = "hidden"
      preloadContainer.style.opacity = "0.01" // Casi invisible pero renderizado
      preloadContainer.style.pointerEvents = "none"
      document.body.appendChild(preloadContainer)

      // Forzar la precarga de las secciones críticas
      const sectionsPreload = document.createElement("div")
      sectionsPreload.innerHTML = `
        <div class="bg-[#570B0A]">
          <div class="bg-[#F2BC57] py-8 px-6">
            <h2 class="text-3xl md:text-5xl font-bold font-display text-[#570B0A]">APRENDE</h2>
          </div>
        </div>
      `
      preloadContainer.appendChild(sectionsPreload)

      // Limpiar después de un breve tiempo
      setTimeout(() => {
        if (document.body.contains(preloadContainer)) {
          document.body.removeChild(preloadContainer)
        }
      }, 1000)
    }

    preloadComponents()

    // Prevent scrolling during intro animation
    if (showIntro) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    // Asegurarse de que el contenido sea visible después de la animación
    if (showContent && contentRef.current) {
      contentRef.current.style.opacity = "1"
      contentRef.current.style.visibility = "visible"
    }
  }, [showIntro, showContent])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setShowContent(true)
  }

  return (
    <main className="min-h-screen">
      {/* Precarga de secciones críticas - invisible pero ya renderizado */}
      <div aria-hidden="true" className="fixed top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        <div className="bg-[#570B0A]">
          <div className="bg-[#F2BC57] py-8 px-6">
            <span className="text-[#570B0A]">Precarga</span>
          </div>
        </div>
      </div>

      {/* Contenido de la página */}
      <div
        ref={contentRef}
        className="page-content"
        style={{
          opacity: showContent ? 1 : 0,
          visibility: showContent ? "visible" : "hidden",
          position: "relative",
          zIndex: 1,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Navigation />
        <StaticBackground />

        {/* Renderizar SectionsNavigation inmediatamente, incluso si está oculto */}
        <div style={{ contain: "content" }}>
          <SectionsNavigation />
        </div>

        <WordsCarousel />
        <PoetrySection />
        <Contact />
        <Footer />
      </div>

      {/* Animación de introducción */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} contentRef={contentRef} />}
    </main>
  )
}
