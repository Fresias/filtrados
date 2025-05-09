"use client"

import type React from "react"

import { useEffect, useRef } from "react"
// @ts-expect-error: Declaración para importación minificada de GSAP
// eslint-disable-next-line
import { gsap } from "gsap/dist/gsap.min.js"
// @ts-expect-error: Declaración para importación minificada de ScrollTrigger
// eslint-disable-next-line
import { ScrollTrigger } from "gsap/dist/ScrollTrigger.min.js"

// Tipos para las configuraciones
type AnimationType = "fade" | "slide" | "scale" | "custom"
type AnimationTarget = React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[] | HTMLElement | HTMLElement[]
type ScrollTriggerConfig = Partial<ScrollTrigger.Vars>

interface AnimationOptions {
  type: AnimationType
  target: AnimationTarget
  trigger?: React.RefObject<HTMLElement>
  scrollTrigger?: boolean | ScrollTriggerConfig
  // Valores opcionales que no sobrescriben los existentes si no se proporcionan
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  duration?: number
  ease?: string
  delay?: number
  stagger?: number | object
  onComplete?: () => void
  customAnimation?: (tl: gsap.core.Timeline, target: any) => void
  // Opción para preservar animaciones existentes
  preserveExisting?: boolean
}

/**
 * Hook para crear animaciones GSAP con configuración flexible
 * que respeta los valores existentes cuando no se proporcionan nuevos
 */
export function useGsapAnimation(options: AnimationOptions) {
  const animationRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    // Inicializar plugins de GSAP
    if (options.scrollTrigger) {
      gsap.registerPlugin(ScrollTrigger)
    }

    // Crear timeline
    const tl = gsap.timeline({
      paused: !options.scrollTrigger,
      onComplete: options.onComplete,
    })

    // Preparar targets
    const targets = Array.isArray(options.target)
      ? (options.target as Array<HTMLElement | React.RefObject<HTMLElement>>)
          .map((t) => (isRefObject(t) ? t.current : t))
          .filter(Boolean)
      : [isRefObject(options.target) ? options.target.current : options.target]

    function isRefObject(obj: any): obj is React.RefObject<HTMLElement> {
      return obj && typeof obj === "object" && "current" in obj;
    }

    // Configuraciones predeterminadas que coinciden con los valores comunes existentes
    // Estos solo se usan si no se proporcionan valores específicos
    const defaultConfigs = {
      fade: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: 0.8, ease: "power2.out" },
      },
      slide: {
        from: { y: 50, opacity: 0 },
        to: { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      },
      scale: {
        from: { scale: 0.8, opacity: 0 },
        to: { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      },
    }

    // Añadir animaciones según el tipo
    if (options.type === "custom" && options.customAnimation) {
      // Animación personalizada
      options.customAnimation(tl, targets)
    } else if (options.type === "fade" || options.type === "slide" || options.type === "scale") {
      // Usar configuraciones predeterminadas si no se proporcionan específicas
      const config = defaultConfigs[options.type]
      const fromConfig = options.from || config.from
      const toConfig = {
        ...config.to,
        duration: options.duration !== undefined ? options.duration : config.to.duration,
        ease: options.ease || config.to.ease,
        delay: options.delay || 0,
        stagger: options.stagger || 0,
        ...options.to, // Permitir sobrescribir propiedades específicas
      }

      // Añadir la animación al timeline
      tl.fromTo(targets, fromConfig, toConfig)
    }

    // Configurar ScrollTrigger si es necesario
    if (options.scrollTrigger && options.trigger?.current) {
      const scrollConfig =
        typeof options.scrollTrigger === "object"
          ? options.scrollTrigger
          : { trigger: options.trigger.current, start: "top 80%" }

      scrollTriggerRef.current = ScrollTrigger.create({
        ...scrollConfig,
        animation: tl,
      })
    }

    // Guardar referencia para limpieza
    animationRef.current = tl

    return () => {
      // Limpiar animaciones
      if (animationRef.current) {
        animationRef.current.kill()
      }

      // Limpiar ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [
    options.type,
    options.scrollTrigger,
    options.duration,
    options.ease,
    options.delay,
    options.stagger,
    options.onComplete,
    // No incluimos target en las dependencias para evitar recreaciones innecesarias
    // si la referencia cambia pero el elemento DOM sigue siendo el mismo
  ])

  // Devolver controles para la animación
  return {
    play: () => animationRef.current?.play(),
    pause: () => animationRef.current?.pause(),
    reverse: () => animationRef.current?.reverse(),
    restart: () => animationRef.current?.restart(),
    timeline: animationRef.current,
  }
}
