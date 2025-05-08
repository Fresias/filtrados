"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { animationTokens } from "@/hooks/use-animation-tokens"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

/**
 * Página de catálogo de animaciones que documenta todas las animaciones existentes
 * sin modificar sus valores originales
 */
export default function AnimationCatalog() {
  // Eliminamos el useEffect que accedía a process.env.NODE_ENV
  // ya que no podemos acceder a variables de entorno en el cliente

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Catálogo de Animaciones</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Esta página documenta todas las animaciones existentes en el proyecto, sus valores y patrones de uso. Sirve
          como referencia para mantener la consistencia visual sin modificar los tiempos originales.
        </p>

        <Tabs defaultValue="existing" className="mb-12">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="existing">Animaciones Existentes</TabsTrigger>
            <TabsTrigger value="tokens">Tokens de Animación</TabsTrigger>
            <TabsTrigger value="guidelines">Guías de Uso</TabsTrigger>
            <TabsTrigger value="performance">Rendimiento</TabsTrigger>
          </TabsList>

          <TabsContent value="existing">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimationCategoryCard
                title="Animaciones Básicas"
                description="Animaciones fundamentales de elementos UI"
                items={[
                  {
                    name: "Basic Animation",
                    duration: animationTokens.duration.existing.basicAnimation,
                    ease: animationTokens.ease.existing.basicAnimation,
                  },
                  {
                    name: "Circle Animation",
                    duration: animationTokens.duration.existing.circleAnimation,
                    ease: animationTokens.ease.existing.circleAnimation,
                  },
                  {
                    name: "Triangle Animation",
                    duration: animationTokens.duration.existing.triangleAnimation,
                    ease: animationTokens.ease.existing.triangleAnimation,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Texto"
                description="Animaciones aplicadas a elementos de texto"
                items={[
                  {
                    name: "Text Animation",
                    duration: animationTokens.duration.existing.textAnimation,
                    ease: animationTokens.ease.existing.textAnimation,
                    stagger: animationTokens.stagger.existing.textAnimation,
                  },
                  {
                    name: "Text Char Stagger",
                    stagger: animationTokens.stagger.existing.textAnimation,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Scroll"
                description="Animaciones activadas por scroll"
                items={[
                  {
                    name: "Scroll Animation",
                    duration: animationTokens.duration.existing.scrollAnimation,
                    ease: animationTokens.ease.existing.scrollAnimation,
                  },
                  {
                    name: "Scroll Mobile",
                    duration: animationTokens.duration.existing.scrollMobileAnimation,
                    ease: animationTokens.ease.existing.scrollAnimation,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Hover"
                description="Animaciones activadas por hover"
                items={[
                  {
                    name: "Hover Animation",
                    duration: animationTokens.duration.existing.hoverAnimation,
                    ease: animationTokens.ease.existing.hoverAnimation,
                  },
                  {
                    name: "Hover Scale",
                    duration: animationTokens.duration.existing.hoverScale,
                    ease: animationTokens.ease.existing.hoverAnimation,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Timeline"
                description="Animaciones secuenciales con timeline"
                items={[
                  {
                    name: "Timeline Animation",
                    duration: animationTokens.duration.existing.timelineAnimation,
                    ease: animationTokens.ease.existing.timelineAnimation,
                  },
                  {
                    name: "Timeline Elastic",
                    ease: animationTokens.ease.existing.timelineElastic,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Página"
                description="Animaciones de carga y transición de página"
                items={[
                  {
                    name: "Intro Animation",
                    duration: animationTokens.duration.existing.introAnimation,
                    ease: animationTokens.ease.existing.introAnimation,
                  },
                  {
                    name: "Word Transition",
                    duration: animationTokens.duration.existing.wordTransition,
                    ease: animationTokens.ease.existing.introAnimation,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones de Componentes"
                description="Animaciones específicas de componentes"
                items={[
                  {
                    name: "Menu Item",
                    duration: animationTokens.duration.existing.menuItemAnimation,
                    ease: animationTokens.ease.existing.menuItemAnimation,
                    stagger: animationTokens.stagger.existing.menuItems,
                  },
                  {
                    name: "Product Carousel",
                    duration: animationTokens.duration.existing.productCarousel,
                    ease: animationTokens.ease.existing.productCarousel,
                    stagger: animationTokens.stagger.existing.productItems,
                  },
                  {
                    name: "Contact Form",
                    duration: animationTokens.duration.existing.contactForm,
                    ease: animationTokens.ease.existing.contactForm,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Animaciones Continuas"
                description="Animaciones que se repiten continuamente"
                items={[
                  {
                    name: "Words Carousel",
                    duration: animationTokens.duration.existing.wordsCarousel,
                    ease: animationTokens.ease.existing.wordsCarousel,
                    repeat: animationTokens.repeat.existing.wordsCarousel,
                  },
                  {
                    name: "Floating Elements",
                    repeat: animationTokens.repeat.existing.floatingElements,
                  },
                ]}
              />

              <AnimationCategoryCard
                title="Efectos Parallax"
                description="Efectos de parallax en scroll"
                items={[
                  {
                    name: "Parallax Scroll",
                    ease: animationTokens.ease.existing.parallaxScroll,
                  },
                ]}
              />
            </div>
          </TabsContent>

          <TabsContent value="tokens">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TokenCategoryCard
                title="Duraciones"
                description="Tokens de duración para animaciones"
                tokens={animationTokens.duration}
                excludeKeys={["existing"]}
              />

              <TokenCategoryCard
                title="Easings"
                description="Tokens de easing para animaciones"
                tokens={animationTokens.ease}
                excludeKeys={["existing"]}
              />

              <TokenCategoryCard
                title="Staggers"
                description="Tokens de stagger para animaciones secuenciales"
                tokens={animationTokens.stagger}
                excludeKeys={["existing"]}
              />

              <TokenCategoryCard
                title="Delays"
                description="Tokens de delay para animaciones"
                tokens={animationTokens.delay}
                excludeKeys={["existing"]}
              />

              <TokenCategoryCard
                title="Repeticiones"
                description="Tokens de repetición para animaciones"
                tokens={animationTokens.repeat}
                excludeKeys={["existing"]}
              />
            </div>
          </TabsContent>

          <TabsContent value="guidelines">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Principios de Animación</CardTitle>
                  <CardDescription>Guías generales para mantener la consistencia visual</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Principios Fundamentales</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Respetar los tiempos y easings de las animaciones existentes</li>
                    <li>Usar el sistema de tokens para nuevas animaciones</li>
                    <li>Implementar soporte para prefers-reduced-motion en todas las animaciones</li>
                    <li>Utilizar los hooks de animación para nueva funcionalidad</li>
                    <li>Monitorear el rendimiento de animaciones complejas</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Categorías de Animación</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Micro-interacciones:</strong> Duración rápida (0.2-0.3s), easing simple
                    </li>
                    <li>
                      <strong>Transiciones de contenido:</strong> Duración media (0.5-0.8s), easing suave
                    </li>
                    <li>
                      <strong>Animaciones de atención:</strong> Duración variable (0.8-1.2s), easing expresivo
                    </li>
                    <li>
                      <strong>Transiciones de página:</strong> Duración más larga (0.8-1.5s), easing elaborado
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementación de Animaciones</CardTitle>
                  <CardDescription>Recomendaciones técnicas para implementar animaciones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Mejores Prácticas</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Usar propiedades transform y opacity para mejor rendimiento</li>
                    <li>Implementar will-change solo cuando sea necesario</li>
                    <li>Limpiar correctamente las animaciones en useEffect</li>
                    <li>Usar batch para animaciones múltiples</li>
                    <li>Implementar animaciones más simples en dispositivos móviles</li>
                    <li>Usar matchMedia para animaciones responsivas</li>
                  </ul>

                  <h3 className="text-lg font-medium mt-6">Accesibilidad</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Respetar prefers-reduced-motion en todas las animaciones</li>
                    <li>Proporcionar alternativas no animadas cuando sea posible</li>
                    <li>Evitar animaciones que puedan causar mareo o desorientación</li>
                    <li>Asegurar que el contenido sea accesible incluso sin animaciones</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Monitoreo de Rendimiento</CardTitle>
                <CardDescription>
                  Herramientas y métricas para monitorear el rendimiento de las animaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Animaciones Monitoreadas</h3>
                    <p className="mb-4">Las siguientes animaciones tienen monitoreo de rendimiento implementado:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>IntroAnimation - Animación inicial de la página</li>
                      <li>ScrollAnimation - Animaciones activadas por scroll</li>
                      <li>ProductCarousel - Carrusel de productos</li>
                      <li>WordsCarousel - Carrusel de palabras</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Cómo Usar el Monitoreo</h3>
                    <p className="mb-2">
                      El hook useAnimationPerformance está disponible para monitorear el rendimiento de cualquier
                      animación:
                    </p>
                    <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto">
                      {`// Importar el hook
import { useAnimationPerformance } from "@/hooks/use-animation-performance";

// Usar en el componente
useAnimationPerformance("NombreAnimacion", true);

// Ver resultados en la consola del navegador
// [NombreAnimacion] Rendimiento: XX.XX FPS`}
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Métricas de Rendimiento</h3>
                    <p>
                      El rendimiento se mide en FPS (frames por segundo). Para una experiencia fluida, se recomienda:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>
                        <span className="font-medium">60+ FPS:</span> Excelente rendimiento
                      </li>
                      <li>
                        <span className="font-medium">30-59 FPS:</span> Rendimiento aceptable
                      </li>
                      <li>
                        <span className="font-medium">&lt;30 FPS:</span> Rendimiento deficiente, requiere optimización
                      </li>
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

// Componente para mostrar una categoría de animaciones
function AnimationCategoryCard({ title, description, items }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
              <h4 className="font-medium text-lg mb-2">{item.name}</h4>
              <div className="space-y-1 text-sm">
                {item.duration !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duración:</span>
                    <span>{item.duration}s</span>
                  </div>
                )}
                {item.ease !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Easing:</span>
                    <span>{item.ease}</span>
                  </div>
                )}
                {item.stagger !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stagger:</span>
                    <span>{item.stagger}s</span>
                  </div>
                )}
                {item.delay !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delay:</span>
                    <span>{item.delay}s</span>
                  </div>
                )}
                {item.repeat !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Repeat:</span>
                    <span>{item.repeat === -1 ? "Infinito" : item.repeat}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar una categoría de tokens
function TokenCategoryCard({ title, description, tokens, excludeKeys = [] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(tokens)
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, value]) => (
              <div key={key} className="flex justify-between border-b pb-2 last:border-b-0">
                <span className="font-medium">{key}:</span>
                <span>{typeof value === "object" ? JSON.stringify(value) : value}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
