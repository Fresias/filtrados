"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Determinar la configuración de animación basada en prefers-reduced-motion
    const fromY = prefersReducedMotion ? 0 : 50
    const fromX = prefersReducedMotion ? 0 : 50
    const duration = prefersReducedMotion ? 0.3 : 0.8

    // Animate section title
    gsap.fromTo(
      ".contact-title",
      { y: fromY, opacity: prefersReducedMotion ? 0.8 : 0 },
      {
        y: 0,
        opacity: 1,
        duration: duration,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate form
    gsap.fromTo(
      formRef.current,
      { x: prefersReducedMotion ? 0 : -fromX, opacity: prefersReducedMotion ? 0.8 : 0 },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Animate info
    gsap.fromTo(
      infoRef.current,
      { x: prefersReducedMotion ? 0 : fromX, opacity: prefersReducedMotion ? 0.8 : 0 },
      {
        x: 0,
        opacity: 1,
        duration: duration,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [prefersReducedMotion])

  return (
    <section ref={sectionRef} id="contacto" className="py-24 bg-[#FFEDCO]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#570B0A] mb-16 contact-title font-display">
          Contáctanos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <form ref={formRef} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-[#570B0A] font-body">
                  Nombre
                </label>
                <Input id="name" placeholder="Tu nombre" className="border-[#570B0A]/30" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#570B0A] font-body">
                  Email
                </label>
                <Input id="email" type="email" placeholder="tu@email.com" className="border-[#570B0A]/30" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium text-[#570B0A] font-body">
                Asunto
              </label>
              <Input id="subject" placeholder="Asunto de tu mensaje" className="border-[#570B0A]/30" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-[#570B0A] font-body">
                Mensaje
              </label>
              <Textarea id="message" placeholder="Tu mensaje" rows={5} className="border-[#570B0A]/30" />
            </div>
            <Button className="w-full bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">Enviar Mensaje</Button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#570B0A] font-display">Información de Contacto</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-[#570B0A]" />
                  <span className="text-[#570B0A] font-body">+52 123 456 7890</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-[#570B0A]" />
                  <span className="text-[#570B0A] font-body">info@filtrados.com</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#570B0A] font-display">Horario de Atención</h3>
              <p className="mb-2 text-[#570B0A] font-body">Lunes a Viernes: 7:00 AM - 8:00 PM</p>
              <p className="text-[#570B0A] font-body">Sábado y Domingo: 8:00 AM - 6:00 PM</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#570B0A] font-display">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/70 transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/70 transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/70 transition-colors">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
