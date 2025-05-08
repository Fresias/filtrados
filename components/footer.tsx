"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUp } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    // Determinar la configuración de animación basada en prefers-reduced-motion
    const fromY = prefersReducedMotion ? 0 : 20
    const duration = prefersReducedMotion ? 0.3 : 0.8

    // Animate footer elements
    gsap.fromTo(
      ".footer-content",
      { y: fromY, opacity: prefersReducedMotion ? 0.8 : 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [prefersReducedMotion])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  return (
    <footer ref={footerRef} className="bg-[#570B0A] py-12">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 font-display text-[#FFEDC0]">FILTRADOS</h3>
            <p className="text-[#FFEDC0] max-w-md font-body">
              Ofrecemos una experiencia única de café de especialidad en un ambiente acogedor. Nuestro compromiso es con
              la calidad, la sostenibilidad y el servicio excepcional.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-display text-[#FFEDC0]">Enlaces Rápidos</h4>
            <ul className="space-y-2 font-body">
              {["Inicio", "Sobre Nosotros", "Productos", "Ubicaciones", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-[#FFEDC0] hover:text-[#F2BC57] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 font-display text-[#FFEDC0]">Legal</h4>
            <ul className="space-y-2 font-body">
              {["Términos y Condiciones", "Política de Privacidad", "Política de Cookies"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[#FFEDC0] hover:text-[#F2BC57] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-content mt-12 pt-6 border-t border-[#FFEDC0]/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#FFEDC0] text-sm font-body">
            © {new Date().getFullYear()} Filtrados. Todos los derechos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-[#FFEDC0] hover:text-[#F2BC57] transition-colors font-body"
          >
            <span className="mr-2">Volver arriba</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  )
}
