"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"

export function WordsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wordsTrackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  // Estado para controlar la visibilidad inicial
  const [isReady, setIsReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  // Obtener tokens de animación específicos para este componente
  const { duration, ease, repeat } = useAnimationTokens("wordsCarousel")

  // Monitorear el rendimiento de esta animación crítica
  useAnimationPerformance("WordsCarousel", true)

  // Palabras para el carrusel - definidas fuera del useEffect para poder usarlas en el renderizado inicial
  const words = [
    "DESPERTAR",
    "SENTIR",
    "CALIDEZ",
    "NOSTALGIA",
    "MOMENTO",
    "AUTENTICIDAD",
    "DISFRUTAR",
    "COMPARTIR",
    "RECONECTAR",
  ]

  useEffect(() => {
    if (!containerRef.current || !wordsTrackRef.current) return

    // Si el usuario prefiere reducir el movimiento, mostramos las palabras sin animación
    if (prefersReducedMotion) {
      setIsReady(true)
      return
    }

    // Configurar la animación de desplazamiento continuo
    const trackWidth = wordsTrackRef.current.scrollWidth / 2

    // Usar requestAnimationFrame para asegurarnos de que el DOM está listo
    const rafId = requestAnimationFrame(() => {
      // Medir el ancho real después de que el DOM esté listo
      const actualTrackWidth = wordsTrackRef.current?.scrollWidth / 2 || trackWidth

      // Crear la animación con GSAP
      animationRef.current = gsap.to(wordsTrackRef.current, {
        x: -actualTrackWidth,
        duration: duration, // Usar el valor del token
        ease: ease, // Usar el valor del token
        repeat: repeat, // Usar el valor del token
        onRepeat: () => {
          // Reiniciar la posición sin animación visible
          gsap.set(wordsTrackRef.current, { x: 0 })
        },
      })

      // Optimizar para rendimiento
      if (wordsTrackRef.current) {
        wordsTrackRef.current.style.willChange = "transform"
      }

      // Marcar como listo para mostrar con opacidad completa
      setIsReady(true)
    })

    return () => {
      // Limpiar animaciones y referencias
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }

      // Cancelar el requestAnimationFrame si aún no se ha ejecutado
      cancelAnimationFrame(rafId)

      // Eliminar will-change para liberar recursos
      if (wordsTrackRef.current) {
        wordsTrackRef.current.style.willChange = "auto"
      }
    }
  }, [prefersReducedMotion, duration, ease, repeat])

  // Optimizar para reducir reflows
  const trackStyle = {
    opacity: isReady ? 1 : 0.99, // Usar 0.99 en lugar de 0 para que sea casi visible desde el inicio
    transform: "translateZ(0)", // Forzar composición de GPU
    willChange: "transform", // Indicar al navegador que se animará
    contain: "content", // Optimizar rendering
  }

  // Renderizar las palabras directamente en el JSX en lugar de crearlas dinámicamente
  return (
    <section className="py-12 bg-[#570B0A] overflow-hidden w-full" style={{ contain: "content" }}>
      <div ref={containerRef} className="w-full overflow-hidden" style={{ opacity: isReady ? 1 : 0.99 }}>
        <div ref={wordsTrackRef} className="inline-block whitespace-nowrap" style={trackStyle}>
          {/* Primer conjunto de palabras */}
          {words.map((word, index) => (
            <div
              key={`word1-${index}`}
              className="inline-block mx-8 text-5xl md:text-7xl font-bold font-display tracking-tight text-[#F2BC57]"
            >
              {word}
            </div>
          ))}

          {/* Segundo conjunto de palabras para el loop continuo */}
          {words.map((word, index) => (
            <div
              key={`word2-${index}`}
              className="inline-block mx-8 text-5xl md:text-7xl font-bold font-display tracking-tight text-[#F2BC57]"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
