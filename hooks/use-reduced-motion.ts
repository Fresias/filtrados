"use client"

import { useEffect, useState } from "react"

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Verificar si el usuario prefiere reducir el movimiento
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    // Escuchar cambios en la preferencia
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return prefersReducedMotion
}
