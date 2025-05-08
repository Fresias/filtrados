"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Coffee, Droplet, Flame, Award, Clock } from "lucide-react"

export default function AprendePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  const addToCardsRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animación del título
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )

    // Animación de la imagen y contenido
    gsap.fromTo(
      [imageRef.current, contentRef.current],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        delay: 0.3,
      },
    )

    // Animación de las tarjetas
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const guideCards = [
    {
      title: "Métodos de preparación",
      description: "Aprende las técnicas para preparar café con diferentes métodos: V60, Chemex, Aeropress y más.",
      icon: <Coffee className="h-8 w-8 text-[#570B0A]" />,
    },
    {
      title: "Tipos de café",
      description: "Descubre las diferencias entre variedades de café, orígenes y perfiles de sabor.",
      icon: <Droplet className="h-8 w-8 text-[#570B0A]" />,
    },
    {
      title: "Técnicas de tueste",
      description: "Conoce cómo el proceso de tueste afecta el sabor y aroma de tu café.",
      icon: <Flame className="h-8 w-8 text-[#570B0A]" />,
    },
    {
      title: "Equipamiento",
      description: "Guías para elegir el mejor equipamiento según tus necesidades y presupuesto.",
      icon: <Award className="h-8 w-8 text-[#570B0A]" />,
    },
    {
      title: "Recetas",
      description: "Recetas paso a paso para preparar bebidas de café especiales en casa.",
      icon: <BookOpen className="h-8 w-8 text-[#570B0A]" />,
    },
    {
      title: "Consejos de barista",
      description: "Trucos profesionales para mejorar tus habilidades y conocimientos sobre café.",
      icon: <Clock className="h-8 w-8 text-[#570B0A]" />,
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      <section ref={sectionRef} className="pt-24 pb-16 bg-[#FFEDCO]">
        <div className="container mx-auto px-4">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center text-[#570B0A] mb-16 font-display">
            APRENDE
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div ref={imageRef} className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?key=fqvml" alt="Aprendiendo sobre café" fill className="object-cover" />
            </div>

            <div ref={contentRef} className="space-y-6">
              <h2 className="text-3xl font-bold text-[#570B0A] font-display">Centro Educativo de Café</h2>
              <p className="text-lg text-[#570B0A] font-body">
                Bienvenido a nuestro espacio dedicado al aprendizaje sobre el mundo del café. Aquí encontrarás guías
                detalladas, consejos de expertos y recursos educativos para perfeccionar tus conocimientos y habilidades
                en la preparación del café.
              </p>
              <p className="text-lg text-[#570B0A] font-body">
                Ya seas principiante o entusiasta avanzado, nuestro contenido está diseñado para ayudarte a entender
                mejor los matices del café y elevar tu experiencia cafetera.
              </p>
              <Button className="bg-[#570B0A] text-[#FFEDCO] hover:bg-[#570B0A]/90">Explorar todos los recursos</Button>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-[#570B0A] mb-12 font-display">Guías de Preparación</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {guideCards.map((card, index) => (
              <Card key={index} ref={addToCardsRef} className="border-none shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">{card.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-[#570B0A] mb-2 font-display">{card.title}</h3>
                      <p className="text-[#570B0A] font-body">{card.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">Ver todas las guías</Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
