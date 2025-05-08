"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Instagram, Heart } from "lucide-react"

export default function InspiratePage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const addToImagesRef = (el: HTMLDivElement) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el)
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

    // Animación de las imágenes
    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const galleryImages = [
    {
      src: "/placeholder.svg?height=600&width=600&query=aesthetic coffee brewing station with chemex",
      alt: "Estación de café con Chemex",
      caption: "Estación minimalista con Chemex",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=cozy home coffee corner with plants",
      alt: "Rincón de café acogedor",
      caption: "Rincón de café con plantas",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=coffee shop interior design with wooden elements",
      alt: "Diseño interior de cafetería",
      caption: "Cafetería con elementos de madera",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=coffee brewing tools neatly arranged",
      alt: "Herramientas de preparación de café",
      caption: "Colección de herramientas de preparación",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=coffee and book on wooden table",
      alt: "Café y libro",
      caption: "Momento de lectura y café",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=barista workspace with espresso machine",
      alt: "Espacio de trabajo de barista",
      caption: "Espacio de trabajo profesional",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=coffee beans and grinder close up",
      alt: "Granos de café y molinillo",
      caption: "El arte de la molienda",
    },
    {
      src: "/placeholder.svg?height=600&width=600&query=latte art in white cup",
      alt: "Arte latte",
      caption: "Expresión artística en café",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      <section ref={sectionRef} className="pt-24 pb-16 bg-[#FFEDCO]">
        <div className="container mx-auto px-4">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center text-[#570B0A] mb-16 font-display">
            INSPÍRATE
          </h1>

          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-lg text-[#570B0A] font-body">
              Descubre espacios, configuraciones y momentos que celebran la cultura del café. Nuestra galería de
              inspiración te muestra cómo otros amantes del café han creado sus espacios perfectos para disfrutar de
              esta pasión.
            </p>
          </div>

          <div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                ref={addToImagesRef}
                className="relative aspect-square overflow-hidden rounded-md cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#570B0A]/0 group-hover:bg-[#570B0A]/30 transition-colors duration-300 flex items-center justify-center">
                  <Heart className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-y-6">
            <Button className="bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">Ver más inspiración</Button>

            <div className="flex items-center justify-center gap-4">
              <span className="text-[#570B0A] font-body">Síguenos en Instagram para más inspiración</span>
              <a href="#" className="text-[#570B0A] hover:text-[#570B0A]/70 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal para ver imagen ampliada */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full h-[80vh] p-4">
            <button className="absolute top-0 right-0 z-10 text-white text-4xl" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <div className="relative w-full h-full">
              <Image
                src={galleryImages[selectedImage].src || "/placeholder.svg"}
                alt={galleryImages[selectedImage].alt}
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <p className="text-white text-xl bg-black/50 inline-block px-4 py-2 rounded">
                {galleryImages[selectedImage].caption}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
