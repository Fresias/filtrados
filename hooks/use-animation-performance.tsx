"use client"

import { useEffect, useRef, useState } from "react"

// Interfaz para las métricas de rendimiento
interface PerformanceMetrics {
  fps: number
  minFps: number
  maxFps: number
  avgFps: number
  frameCount: number
  droppedFrames: number
  lastUpdated: number
}

// Almacén global para métricas de rendimiento
// Esto permite acceder a las métricas desde cualquier parte de la aplicación
const globalMetrics: Record<string, PerformanceMetrics> = {}

/**
 * Hook para monitorear el rendimiento de las animaciones
 * Versión mejorada con más métricas y capacidad de exportación
 */
export function useAnimationPerformance(label: string, enabled = true) {
  const frameRateRef = useRef<number[]>([])
  const lastTimeRef = useRef<number>(0)
  const rafRef = useRef<number | null>(null)
  const isRunningRef = useRef<boolean>(false)
  const startTimeRef = useRef<number>(0)
  const frameCountRef = useRef<number>(0)
  const droppedFramesRef = useRef<number>(0)
  const expectedFpsRef = useRef<number>(60) // Valor esperado de FPS (60 es estándar)

  // Estado local para métricas (opcional, para renderizado)
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    minFps: Number.POSITIVE_INFINITY,
    maxFps: 0,
    avgFps: 0,
    frameCount: 0,
    droppedFrames: 0,
    lastUpdated: 0,
  })

  // Referencia para determinar si estamos en desarrollo
  const isDevelopmentRef = useRef<boolean>(false)

  useEffect(() => {
    // Verificar si estamos en desarrollo basándonos en características del navegador
    isDevelopmentRef.current =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("vercel.app")

    // Detectar la tasa de refresco del monitor
    if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
      // Método moderno para detectar la tasa de refresco
      const video = document.createElement("video")
      let lastTime = 0
      let frameCount = 0
      const frameRates: number[] = []

      const callback = (now: number, metadata: any) => {
        if (lastTime) {
          const delta = now - lastTime
          if (delta > 0) {
            const fps = 1000 / delta
            frameRates.push(fps)
            frameCount++

            if (frameCount >= 10) {
              const avgFps = frameRates.reduce((sum, fps) => sum + fps, 0) / frameRates.length
              expectedFpsRef.current = Math.round(avgFps)
              video.remove()
            } else {
              video.requestVideoFrameCallback(callback)
            }
          }
        }
        lastTime = now
      }

      video.requestVideoFrameCallback(callback)
      document.body.appendChild(video)
    } else {
      // Método alternativo
      const testFps = () => {
        let lastTime = performance.now()
        const frameRates: number[] = []
        let frameCount = 0

        const checkFrame = () => {
          const now = performance.now()
          const delta = now - lastTime
          if (delta > 0) {
            const fps = 1000 / delta
            frameRates.push(fps)
            frameCount++

            if (frameCount >= 10) {
              const avgFps = frameRates.reduce((sum, fps) => sum + fps, 0) / frameRates.length
              expectedFpsRef.current = Math.round(avgFps)
            } else {
              lastTime = now
              requestAnimationFrame(checkFrame)
            }
          }
        }

        requestAnimationFrame(checkFrame)
      }

      testFps()
    }

    // Solo ejecutar si está habilitado y estamos en un entorno que parece desarrollo
    if (!enabled || !isDevelopmentRef.current) return

    startTimeRef.current = performance.now()

    const measureFrameRate = (time: number) => {
      if (lastTimeRef.current) {
        const delta = time - lastTimeRef.current
        const fps = 1000 / delta
        frameRateRef.current.push(fps)
        frameCountRef.current++

        // Detectar frames perdidos
        // Si el delta es mayor que 1.5 veces el tiempo esperado para un frame,
        // consideramos que se han perdido frames
        const expectedFrameTime = 1000 / expectedFpsRef.current
        if (delta > expectedFrameTime * 1.5) {
          const missedFrames = Math.floor(delta / expectedFrameTime) - 1
          droppedFramesRef.current += missedFrames
        }

        // Registrar cada 60 frames o cada 2 segundos
        if (frameRateRef.current.length >= 60 || time - startTimeRef.current > 2000) {
          const currentFps = fps
          const minFps = Math.min(...frameRateRef.current)
          const maxFps = Math.max(...frameRateRef.current)
          const avgFps = frameRateRef.current.reduce((sum, fps) => sum + fps, 0) / frameRateRef.current.length

          // Actualizar métricas globales
          globalMetrics[label] = {
            fps: currentFps,
            minFps,
            maxFps,
            avgFps,
            frameCount: frameCountRef.current,
            droppedFrames: droppedFramesRef.current,
            lastUpdated: time,
          }

          // Actualizar estado local (opcional)
          setMetrics(globalMetrics[label])

          // Registrar en consola
          console.log(
            `[${label}] Rendimiento: ${avgFps.toFixed(2)} FPS (min: ${minFps.toFixed(2)}, max: ${maxFps.toFixed(2)}, dropped: ${droppedFramesRef.current})`,
          )

          // Reiniciar array para el próximo ciclo
          frameRateRef.current = []
        }
      }

      lastTimeRef.current = time
      if (isRunningRef.current) {
        rafRef.current = requestAnimationFrame(measureFrameRate)
      }
    }

    // Iniciar medición
    isRunningRef.current = true
    rafRef.current = requestAnimationFrame(measureFrameRate)

    return () => {
      // Detener medición
      isRunningRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Registrar métricas finales
      if (frameRateRef.current.length > 0) {
        const avgFps = frameRateRef.current.reduce((sum, fps) => sum + fps, 0) / frameRateRef.current.length
        console.log(
          `[${label}] Métricas finales: ${avgFps.toFixed(2)} FPS, ${frameCountRef.current} frames, ${droppedFramesRef.current} dropped`,
        )
      }
    }
  }, [label, enabled])

  // Devolver controles y métricas
  return {
    metrics,
    start: () => {
      isRunningRef.current = true
      if (!rafRef.current) {
        startTimeRef.current = performance.now()
        rafRef.current = requestAnimationFrame((time) => {
          lastTimeRef.current = time
          measureFrameRate(time)
        })
      }
    },
    stop: () => {
      isRunningRef.current = false
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    },
    getMetrics: () => globalMetrics[label],
    getAllMetrics: () => globalMetrics,
  }

  // Función interna para medir
  function measureFrameRate(time: number) {
    if (lastTimeRef.current) {
      const delta = time - lastTimeRef.current
      const fps = 1000 / delta
      frameRateRef.current.push(fps)
      frameCountRef.current++

      // Detectar frames perdidos
      const expectedFrameTime = 1000 / expectedFpsRef.current
      if (delta > expectedFrameTime * 1.5) {
        const missedFrames = Math.floor(delta / expectedFrameTime) - 1
        droppedFramesRef.current += missedFrames
      }

      // Registrar cada 60 frames o cada 2 segundos
      if (frameRateRef.current.length >= 60 || time - startTimeRef.current > 2000) {
        const currentFps = fps
        const minFps = Math.min(...frameRateRef.current)
        const maxFps = Math.max(...frameRateRef.current)
        const avgFps = frameRateRef.current.reduce((sum, fps) => sum + fps, 0) / frameRateRef.current.length

        // Actualizar métricas globales
        globalMetrics[label] = {
          fps: currentFps,
          minFps,
          maxFps,
          avgFps,
          frameCount: frameCountRef.current,
          droppedFrames: droppedFramesRef.current,
          lastUpdated: time,
        }

        // Actualizar estado local
        setMetrics(globalMetrics[label])

        // Registrar en consola
        console.log(
          `[${label}] Rendimiento: ${avgFps.toFixed(2)} FPS (min: ${minFps.toFixed(2)}, max: ${maxFps.toFixed(2)}, dropped: ${droppedFramesRef.current})`,
        )

        // Reiniciar array para el próximo ciclo
        frameRateRef.current = []
      }
    }

    lastTimeRef.current = time
    if (isRunningRef.current) {
      rafRef.current = requestAnimationFrame(measureFrameRate)
    }
  }
}

// Exportar función para acceder a las métricas desde cualquier parte
export function getAnimationMetrics() {
  return globalMetrics
}

// Exportar función para generar un informe de rendimiento
export function generatePerformanceReport() {
  const report = {
    timestamp: new Date().toISOString(),
    metrics: { ...globalMetrics },
    summary: {
      totalComponents: Object.keys(globalMetrics).length,
      avgFps: 0,
      worstPerformer: "",
      worstFps: Number.POSITIVE_INFINITY,
      bestPerformer: "",
      bestFps: 0,
      totalDroppedFrames: 0,
    },
  }

  // Calcular estadísticas
  let totalFps = 0
  let componentCount = 0

  Object.entries(globalMetrics).forEach(([label, metrics]) => {
    totalFps += metrics.avgFps
    componentCount++

    if (metrics.avgFps < report.summary.worstFps) {
      report.summary.worstFps = metrics.avgFps
      report.summary.worstPerformer = label
    }

    if (metrics.avgFps > report.summary.bestFps) {
      report.summary.bestFps = metrics.avgFps
      report.summary.bestPerformer = label
    }

    report.summary.totalDroppedFrames += metrics.droppedFrames
  })

  if (componentCount > 0) {
    report.summary.avgFps = totalFps / componentCount
  }

  return report
}
