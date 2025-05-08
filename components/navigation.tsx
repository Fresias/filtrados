"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      gsap.fromTo(
        ".nav-item",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, ease: "power3.out", duration: 0.6 },
      )
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#FFEDCO]/90 backdrop-blur-md py-3 shadow-sm" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-[#570B0A] font-display">
            FILTRADOS
          </a>
          <nav className="hidden md:flex space-x-8">
            {["Inicio", "Sobre Nosotros", "Productos", "Ubicaciones", "Contacto"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[#570B0A] hover:text-[#570B0A]/70 transition-colors font-body"
              >
                {item}
              </a>
            ))}
          </nav>
          <Button variant="ghost" size="icon" className="md:hidden text-[#570B0A]" onClick={() => setIsOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#FFEDCO] z-50 flex flex-col">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-[#570B0A] font-display">
              FILTRADOS
            </a>
            <Button variant="ghost" size="icon" className="text-[#570B0A]" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {["Inicio", "Sobre Nosotros", "Productos", "Ubicaciones", "Contacto"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-3xl font-medium text-[#570B0A] hover:text-[#570B0A]/70 transition-colors nav-item font-display"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
