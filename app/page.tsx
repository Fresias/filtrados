import { Navigation } from "@/components/navigation"
import { SectionsNavigation } from "@/components/sections-navigation"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { IntroAnimation } from "@/components/intro-animation"
import { PoetrySection } from "@/components/poetry-section"
import { WordsCarousel } from "@/components/words-carousel"
import { StaticBackground } from "@/components/static-background"

export default function Home() {
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
      <div className="page-content" style={{ position: "relative", zIndex: 1 }}>
        <Navigation />
        <StaticBackground />
        <div style={{ contain: "content" }}>
          <SectionsNavigation />
        </div>
        <WordsCarousel />
        <PoetrySection />
        <Contact />
        <Footer />
      </div>

      {/* Animación de introducción */}
      <IntroAnimation />
    </main>
  )
}
