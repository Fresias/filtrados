"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Users, Video, MessageSquare, Star } from "lucide-react"

export default function ExperienciaPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const workshopsRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)

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

    // Animación del hero
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
      },
    )

    // Animación de las secciones al hacer scroll
    const sections = [testimonialsRef.current, workshopsRef.current, communityRef.current]

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const testimonials = [
    {
      name: "María García",
      text: "Los workshops de FILTRADOS cambiaron mi forma de preparar café. Ahora disfruto cada mañana de un café excepcional gracias a las técnicas que aprendí.",
      image: "/placeholder.svg?height=100&width=100&query=woman portrait",
      rating: 5,
    },
    {
      name: "Carlos Rodríguez",
      text: "La comunidad que han creado es increíble. He conocido a personas que comparten mi pasión y he aprendido muchísimo de las experiencias compartidas.",
      image: "/placeholder.svg?height=100&width=100&query=man portrait",
      rating: 5,
    },
    {
      name: "Laura Martínez",
      text: "Los productos son excelentes, pero lo que realmente marca la diferencia es el conocimiento que comparten. Su pasión por el café es contagiosa.",
      image: "/placeholder.svg?height=100&width=100&query=woman portrait smiling",
      rating: 5,
    },
  ]

  const upcomingWorkshops = [
    {
      title: "Introducción a los métodos de filtrado",
      date: "15 de Mayo, 2025",
      time: "18:00 - 19:30",
      instructor: "Miguel Sánchez",
      image: "/placeholder.svg?height=200&width=300&query=coffee brewing workshop",
    },
    {
      title: "Masterclass de Latte Art",
      date: "22 de Mayo, 2025",
      time: "17:00 - 19:00",
      instructor: "Ana Gómez",
      image: "/placeholder.svg?height=200&width=300&query=latte art workshop",
    },
    {
      title: "Cata de cafés de especialidad",
      date: "5 de Junio, 2025",
      time: "18:30 - 20:00",
      instructor: "David Torres",
      image: "/placeholder.svg?height=200&width=300&query=coffee tasting event",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      <section ref={sectionRef} className="pt-24 pb-16 bg-[#FFEDCO]">
        <div className="container mx-auto px-4">
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-bold text-center text-[#570B0A] mb-16 font-display">
            EXPERIENCIA
          </h1>

          <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=1000&width=800&query=coffee workshop with people learning brewing techniques"
                alt="Experiencia de café"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[#570B0A] font-display">Vive la Experiencia FILTRADOS</h2>
              <p className="text-lg text-[#570B0A] font-body">
                Más allá de productos, ofrecemos experiencias que conectan personas a través del café. Desde workshops
                virtuales hasta una comunidad vibrante de amantes del café, te invitamos a formar parte de este mundo
                sensorial.
              </p>
              <p className="text-lg text-[#570B0A] font-body">
                Aprende, comparte y crece con nosotros en un ambiente donde la pasión por el café se convierte en
                conexiones auténticas y momentos memorables.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#570B0A] text-[#FFEDCO] hover:bg-[#570B0A]/90">
                  <Calendar className="mr-2 h-4 w-4" />
                  Ver calendario
                </Button>
                <Button className="bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">
                  <Users className="mr-2 h-4 w-4" />
                  Unirse a la comunidad
                </Button>
              </div>
            </div>
          </div>

          {/* Testimonios */}
          <div ref={testimonialsRef} className="mb-20">
            <h2 className="text-3xl font-bold text-center text-[#570B0A] mb-12 font-display">
              Testimonios de Clientes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#570B0A] font-display">{testimonial.name}</h3>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-[#F2BC57] text-[#F2BC57]" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#570B0A] font-body italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Workshops */}
          <div ref={workshopsRef} className="mb-20">
            <h2 className="text-3xl font-bold text-center text-[#570B0A] mb-12 font-display">
              Workshops y Demostraciones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {upcomingWorkshops.map((workshop, index) => (
                <Card key={index} className="border-none shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={workshop.image || "/placeholder.svg"}
                      alt={workshop.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#570B0A] mb-2 font-display">{workshop.title}</h3>
                    <p className="text-[#570B0A] font-body mb-1">{workshop.date}</p>
                    <p className="text-[#570B0A] font-body mb-2">{workshop.time}</p>
                    <p className="text-[#570B0A] font-body italic">Instructor: {workshop.instructor}</p>
                    <Button className="mt-4 w-full bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">
                      Reservar plaza
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button className="bg-[#570B0A] text-[#FFEDCO] hover:bg-[#570B0A]/90">
                <Calendar className="mr-2 h-4 w-4" />
                Ver todos los workshops
              </Button>
            </div>
          </div>

          {/* Comunidad */}
          <div ref={communityRef}>
            <h2 className="text-3xl font-bold text-center text-[#570B0A] mb-12 font-display">Nuestra Comunidad</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-[#570B0A] font-body">
                  Únete a nuestra comunidad de amantes del café donde compartimos conocimientos, experiencias y pasión
                  por el café de especialidad. Participa en conversaciones, comparte tus creaciones y conecta con
                  personas que comparten tu interés.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-[#570B0A] text-[#FFEDCO] hover:bg-[#570B0A]/90">
                    <Users className="mr-2 h-4 w-4" />
                    Unirse al grupo
                  </Button>
                  <Button className="bg-[#F2BC57] text-[#570B0A] hover:bg-[#F2BC57]/90">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Foro de discusión
                  </Button>
                  <Button className="bg-white text-[#570B0A] hover:bg-white/90 border border-[#570B0A]">
                    <Video className="mr-2 h-4 w-4" />
                    Videos de la comunidad
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=coffee community meetup"
                    alt="Comunidad de café"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=people sharing coffee experience"
                    alt="Compartiendo experiencias"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=coffee workshop participants"
                    alt="Participantes de workshop"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-md overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=300&query=coffee enthusiasts group"
                    alt="Grupo de entusiastas"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
