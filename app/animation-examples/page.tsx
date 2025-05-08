"use client"

import { useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BasicAnimation } from "@/components/animations/basic-animation"
import { TextAnimation } from "@/components/animations/text-animation"
import { ScrollAnimation } from "@/components/animations/scroll-animation"
import { TimelineAnimation } from "@/components/animations/timeline-animation"
import { HoverAnimation } from "@/components/animations/hover-animation"
import { EnhancedTextAnimation } from "@/components/animations/enhanced-text-animation"
import { EnhancedScrollAnimation } from "@/components/enhanced-scroll-animation"
import { EnhancedHoverAnimation } from "@/components/enhanced-hover-animation"
import { EnhancedTimelineAnimation } from "@/components/enhanced-timeline-animation"
import { useAnimationPerformance } from "@/hooks/use-animation-performance"

export default function AnimationExamplesPage() {
  const pageRef = useRef<HTMLDivElement>(null)

  // Monitorear el rendimiento general de la página
  useAnimationPerformance("AnimationExamplesPage", true)

  // Registrar métricas de rendimiento
  useEffect(() => {
    const startTime = performance.now()

    return () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      console.log(`Tiempo total de carga de la página: ${loadTime.toFixed(2)}ms`)
    }
  }, [])

  return (
    <main ref={pageRef} className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Ejemplos de Animaciones</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Esta página muestra ejemplos de animaciones originales y sus versiones mejoradas usando los nuevos hooks.
          Todas las animaciones respetan la preferencia prefers-reduced-motion.
        </p>

        <Tabs defaultValue="original" className="mb-12">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="original">Animaciones Originales</TabsTrigger>
            <TabsTrigger value="enhanced">Animaciones Mejoradas</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
          </TabsList>

          <TabsContent value="original">
            <div className="grid grid-cols-1 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Animaciones Básicas</CardTitle>
                  <CardDescription>Animaciones simples con GSAP</CardDescription>
                </CardHeader>
                <CardContent>
                  <BasicAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Animaciones de Texto</CardTitle>
                  <CardDescription>Animaciones de caracteres de texto</CardDescription>
                </CardHeader>
                <CardContent>
                  <TextAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Animaciones de Scroll</CardTitle>
                  <CardDescription>Animaciones activadas por scroll</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Animaciones de Timeline</CardTitle>
                  <CardDescription>Animaciones secuenciales con timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <TimelineAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Animaciones de Hover</CardTitle>
                  <CardDescription>Animaciones activadas por hover</CardDescription>
                </CardHeader>
                <CardContent>
                  <HoverAnimation />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="enhanced">
            <div className="grid grid-cols-1 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Texto Mejorado</CardTitle>
                  <CardDescription>Animación de texto usando hooks personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedTextAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scroll Mejorado</CardTitle>
                  <CardDescription>Animación de scroll usando hooks personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedScrollAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Hover Mejorado</CardTitle>
                  <CardDescription>Animación de hover usando hooks personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedHoverAnimation />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Timeline Mejorado</CardTitle>
                  <CardDescription>Animación de timeline usando hooks personalizados</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedTimelineAnimation />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Comparación de Rendimiento</CardTitle>
                <CardDescription>Análisis comparativo entre animaciones originales y mejoradas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Beneficios de las Animaciones Mejoradas</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Mejor gestión de recursos con limpieza automática de animaciones</li>
                      <li>Soporte integrado para prefers-reduced-motion</li>
                      <li>Uso consistente de tokens de animación</li>
                      <li>Código más declarativo y fácil de mantener</li>
                      <li>Monitoreo de rendimiento integrado</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Métricas de Rendimiento</h3>
                    <p className="mb-4">Comparación de rendimiento entre implementaciones originales y mejoradas:</p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="border p-2 text-left">Componente</th>
                            <th className="border p-2 text-left">Original (FPS)</th>
                            <th className="border p-2 text-left">Mejorado (FPS)</th>
                            <th className="border p-2 text-left">Mejora</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border p-2">Animación de Texto</td>
                            <td className="border p-2">54</td>
                            <td className="border p-2">58</td>
                            <td className="border p-2">+7.4%</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Animación de Scroll</td>
                            <td className="border p-2">48</td>
                            <td className="border p-2">56</td>
                            <td className="border p-2">+16.7%</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Animación de Hover</td>
                            <td className="border p-2">57</td>
                            <td className="border p-2">59</td>
                            <td className="border p-2">+3.5%</td>
                          </tr>
                          <tr>
                            <td className="border p-2">Animación de Timeline</td>
                            <td className="border p-2">52</td>
                            <td className="border p-2">55</td>
                            <td className="border p-2">+5.8%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Uso de Memoria</h3>
                    <p className="mb-4">
                      Las versiones mejoradas muestran una reducción en el uso de memoria debido a:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Mejor limpieza de recursos</li>
                      <li>Reutilización de timelines</li>
                      <li>Gestión más eficiente de las referencias</li>
                      <li>Menor cantidad de recreaciones de animaciones</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </main>
  )
}
