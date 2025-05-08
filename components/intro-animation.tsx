"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"

export function IntroAnimation({
  onComplete,
  contentRef,
}: {
  onComplete: () => void
  contentRef: React.RefObject<HTMLDivElement>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Obtener tokens de animación específicos para este componente
  const { duration, ease, delay } = useAnimationTokens("introAnimation")

  // Monitorear el rendimiento de esta animación crítica
  useAnimationPerformance("IntroAnimation", true)

  useEffect(() => {
    // Definir las palabras una sola vez fuera de cualquier función
    const words = [
      { text: "DESPERTAR", bgColor: "#BF2A13", textColor: "#FFEDCO", variant: "font-bold" },
      { text: "SENTIR", bgColor: "#F2BC57", textColor: "#570B0A", variant: "font-medium" },
      { text: "CALIDEZ", bgColor: "#FFEDCO", textColor: "#BF2A13", variant: "font-bold" },
      { text: "NOSTALGIA", bgColor: "#8ABFAC", textColor: "#570B0A", variant: "font-medium" },
      { text: "MOMENTO", bgColor: "#570B0A", textColor: "#F2BC57", variant: "font-bold" },
      { text: "AUTENTICIDAD", bgColor: "#045951", textColor: "#F2BC57", variant: "font-medium" },
      { text: "DISFRUTAR", bgColor: "#F2BC57", textColor: "#045951", variant: "font-bold" },
      { text: "COMPARTIR", bgColor: "#8ABFAC", textColor: "#BF2A13", variant: "font-medium" },
    ]

    // Definir la última palabra por separado
    const lastWord = { text: "RECONECTAR", bgColor: "#FFEDCO", textColor: "#045951", variant: "font-bold" }

    const container = containerRef.current
    const content = contentRef.current

    if (!container || !content) return

    // Limpiar cualquier contenido existente
    container.innerHTML = ""

    // Si el usuario prefiere reducir el movimiento, saltamos la animación
    if (prefersReducedMotion) {
      setAnimationComplete(true)
      onComplete()
      return
    }

    // Crear elementos para todas las palabras primero (excepto la última)
    // Usar DocumentFragment para mejor rendimiento
    const fragment = document.createDocumentFragment()
    const wordElements = words.map((word) => {
      // Crear un div para cada palabra con estilo de pantalla completa
      const wordEl = document.createElement("div")
      wordEl.className = "absolute inset-0 flex items-center justify-center"
      wordEl.style.backgroundColor = word.bgColor

      // Crear el elemento de texto
      const textEl = document.createElement("h1")
      textEl.className = `hero-text font-display ${word.variant} tracking-tight`
      textEl.style.color = word.textColor
      textEl.textContent = word.text

      wordEl.appendChild(textEl)
      fragment.appendChild(wordEl)

      return wordEl
    })

    // Añadir todos los elementos al DOM de una vez
    container.appendChild(fragment)

    // Inicialmente ocultar todas las palabras
    gsap.set(wordElements, { autoAlpha: 0 })

    // Crear el contenedor para la última palabra directamente
    const lastWordContainer = document.createElement("div")
    lastWordContainer.className = "absolute inset-0 flex items-center justify-center"
    lastWordContainer.style.backgroundColor = lastWord.bgColor
    lastWordContainer.style.zIndex = "10"

    const lastWordText = document.createElement("h1")
    lastWordText.className = `hero-text font-display ${lastWord.variant} tracking-tight`
    lastWordText.style.color = lastWord.textColor
    lastWordText.textContent = lastWord.text

    lastWordContainer.appendChild(lastWordText)
    container.appendChild(lastWordContainer)

    // Inicialmente ocultar este contenedor
    gsap.set(lastWordContainer, { autoAlpha: 0 })

    // Crear timeline con mejor manejo de memoria
    const tl = gsap.timeline({
      onComplete: () => {
        setAnimationComplete(true)
        onComplete()
        // Limpiar referencias para evitar fugas de memoria
        wordElements.length = 0
      },
    })

    // Animar palabras con superposición para evitar ver el fondo
    wordElements.forEach((wordEl, index) => {
      // Primera palabra solo aparece
      if (index === 0) {
        tl.to(wordEl, { autoAlpha: 1, duration: 0.2 })
      }

      // Animar todas las palabras con superposición
      tl.to(
        wordEl,
        { autoAlpha: 0, duration: 0.2 },
        "+=0.05", // Tiempo de visualización muy corto
      )

      // Hacer aparecer la siguiente palabra ligeramente antes de que la actual desaparezca por completo
      // Esto crea una superposición que evita ver el fondo
      if (index < wordElements.length - 1) {
        tl.to(
          wordElements[index + 1],
          { autoAlpha: 1, duration: 0.2 },
          "<0.1", // Comenzar 0.1s antes de que termine la animación anterior
        )
      } else {
        // Para la última palabra de la lista, la siguiente es el contenedor especial
        tl.to(
          lastWordContainer,
          { autoAlpha: 1, duration: 0.2 },
          "<0.1", // Comenzar 0.1s antes de que termine la animación anterior
        )
      }
    })

    // Pausa muy corta en la última palabra
    tl.to({}, {}, "+=0.05")

    // IMPORTANTE: Hacer visible el contenido de la página con opacidad baja ANTES del deslizamiento
    // Primero, asegurarse de que el contenido esté visible pero con opacidad 0
    tl.set(content, {
      visibility: "visible",
      opacity: 0,
      zIndex: 5, // Asegurarse que esté por debajo de la última palabra durante la transición
    })

    // Comenzar a mostrar el contenido ANTES de que comience el deslizamiento
    // Usamos una opacidad más alta y comenzamos más temprano
    tl.to(
      content,
      {
        opacity: 0.7, // Opacidad más alta para que sea más visible
        duration: 0.4, // Más tiempo para cargar
        ease: "power2.in",
      },
      "-=0.4", // Comenzar significativamente antes
    )

    // Deslizar la última palabra hacia arriba mientras el contenido ya es visible
    tl.to(
      lastWordContainer,
      {
        y: "-100%",
        duration: 0.4, // Más rápido
        ease: "power3.inOut",
      },
      "reveal",
    ).to(
      content,
      {
        opacity: 1,
        duration: 0.3, // Más rápido
        ease: "power2.out",
      },
      "reveal-=0.2", // Comenzar significativamente antes del deslizamiento
    )

    // Usar will-change para optimizar el rendimiento
    if (container) {
      container.style.willChange = "transform, opacity"
    }

    if (lastWordContainer) {
      lastWordContainer.style.willChange = "transform, opacity"
    }

    if (content) {
      content.style.willChange = "opacity"
    }

    return () => {
      // Limpiar animaciones y referencias
      tl.kill()

      // Eliminar will-change para liberar recursos
      if (container) {
        container.style.willChange = "auto"
      }

      if (content) {
        content.style.willChange = "auto"
      }
    }
  }, [onComplete, contentRef, prefersReducedMotion, duration, ease, delay])

  if (animationComplete) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full h-full relative"
        style={{
          contain: "layout paint style",
          contentVisibility: "auto",
        }}
      ></div>
    </div>
  )
}
