"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function Menu() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Determinar la configuración de animación basada en prefers-reduced-motion
    const fromY = prefersReducedMotion ? 0 : 50
    const duration = prefersReducedMotion ? 0.3 : 0.8
    const itemDuration = prefersReducedMotion ? 0.3 : 0.6
    const itemDelay = prefersReducedMotion ? 0.05 : 0.1

    // Animate section title
    gsap.fromTo(
      ".menu-title",
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

    // Animate menu items
    const menuItems = gsap.utils.toArray(".menu-item")
    menuItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: prefersReducedMotion ? 0 : 30, opacity: prefersReducedMotion ? 0.8 : 0 },
        {
          y: 0,
          opacity: 1,
          duration: itemDuration,
          delay: prefersReducedMotion ? 0 : itemDelay * i,
          scrollTrigger: {
            trigger: menuItemsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [prefersReducedMotion])

  const coffeeItems = [
    { name: "Espresso", description: "Intenso y aromático", price: "$2.50" },
    { name: "Cappuccino", description: "Espresso con leche vaporizada y espuma", price: "$3.75" },
    { name: "Latte", description: "Suave espresso con leche cremosa", price: "$4.00" },
    { name: "Americano", description: "Espresso diluido con agua caliente", price: "$3.00" },
    { name: "Macchiato", description: "Espresso manchado con espuma de leche", price: "$3.25" },
    { name: "Mocha", description: "Espresso con chocolate y leche", price: "$4.50" },
  ]

  const foodItems = [
    { name: "Croissant", description: "Horneado diariamente", price: "$3.50" },
    { name: "Pan de chocolate", description: "Con chocolate belga", price: "$4.00" },
    { name: "Tarta de manzana", description: "Con canela y nuez moscada", price: "$5.50" },
    { name: "Sándwich de jamón y queso", description: "En pan artesanal", price: "$6.75" },
  ]

  return (
    <section ref={sectionRef} id="menú" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16 menu-title">Nuestro Menú</h2>

        <div ref={menuItemsRef} className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground">Café</h3>
            <div className="space-y-6">
              {coffeeItems.map((item, index) => (
                <Card key={index} className="menu-item border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-medium">{item.name}</h4>
                        <p className="text-[#570B0A]">{item.description}</p>
                      </div>
                      <span className="text-lg font-medium text-primary">{item.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground">Alimentos</h3>
            <div className="space-y-6">
              {foodItems.map((item, index) => (
                <Card key={index} className="menu-item border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xl font-medium">{item.name}</h4>
                        <p className="text-[#570B0A]">{item.description}</p>
                      </div>
                      <span className="text-lg font-medium text-primary">{item.price}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
