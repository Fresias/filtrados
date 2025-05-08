"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function RefactorizationPlan() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="container mx-auto py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Plan de Refactorización</h1>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Este documento detalla el plan para refactorizar selectivamente los componentes de animación sin afectar los
          tiempos visuales ni la experiencia del usuario.
        </p>

        <Tabs defaultValue="priority" className="mb-12">
          <TabsList className="mb-8 flex justify-center">
            <TabsTrigger value="priority">Componentes Prioritarios</TabsTrigger>
            <TabsTrigger value="approach">Enfoque de Refactorización</TabsTrigger>
            <TabsTrigger value="timeline">Cronograma</TabsTrigger>
            <TabsTrigger value="validation">Validación</TabsTrigger>
          </TabsList>

          <TabsContent value="priority">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alta Prioridad</CardTitle>
                  <CardDescription>Componentes críticos para la experiencia del usuario</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>IntroAnimation</strong> - Primera impresión del usuario
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Alto consumo de recursos, no respeta completamente prefers-reduced-motion
                      </p>
                    </li>
                    <li>
                      <strong>WordsCarousel</strong> - Animación continua de larga duración
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animación continua que puede afectar el rendimiento
                      </p>
                    </li>
                    <li>
                      <strong>ProductCarousel</strong> - Componente interactivo con múltiples elementos
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Múltiples animaciones simultáneas, limpieza incompleta
                      </p>
                    </li>
                    <li>
                      <strong>SectionsNavigation</strong> - Navegación principal del sitio
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animaciones complejas en hover, múltiples timelines
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Media Prioridad</CardTitle>
                  <CardDescription>Componentes importantes pero no críticos</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>PoetrySection</strong> - Sección de poesía con animaciones de texto
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Múltiples animaciones secuenciales, efecto parallax
                      </p>
                    </li>
                    <li>
                      <strong>Menu</strong> - Menú de productos
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animaciones en scroll con múltiples elementos
                      </p>
                    </li>
                    <li>
                      <strong>Contact</strong> - Formulario de contacto
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animaciones en scroll con múltiples elementos
                      </p>
                    </li>
                    <li>
                      <strong>Footer</strong> - Pie de página
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animaciones simples pero con limpieza incompleta
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Baja Prioridad</CardTitle>
                  <CardDescription>Componentes con animaciones simples o poco visibles</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <li>
                      <strong>StaticBackground</strong> - Fondo estático
                      <p className="text-sm text-muted-foreground mt-1">Problemas: Animaciones mínimas, bajo impacto</p>
                    </li>
                    <li>
                      <strong>ProductItem</strong> - Elemento individual de producto
                      <p className="text-sm text-muted-foreground mt-1">Problemas: Animaciones de hover simples</p>
                    </li>
                    <li>
                      <strong>About</strong> - Sección Sobre Nosotros
                      <p className="text-sm text-muted-foreground mt-1">Problemas: Animaciones simples en scroll</p>
                    </li>
                    <li>
                      <strong>Hero</strong> - Sección de héroe
                      <p className="text-sm text-muted-foreground mt-1">
                        Problemas: Animaciones simples, ya optimizadas
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="approach">
            <Card>
              <CardHeader>
                <CardTitle>Enfoque de Refactorización</CardTitle>
                <CardDescription>Metodología para refactorizar sin afectar la experiencia visual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">1. Análisis y Documentación</h3>
                    <p className="mb-2">Antes de modificar cada componente, documentar exhaustivamente:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Valores exactos de duración, easing, delays y staggers</li>
                      <li>Secuencia precisa de animaciones</li>
                      <li>Comportamiento en diferentes breakpoints</li>
                      <li>Comportamiento con prefers-reduced-motion</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">2. Implementación Paralela</h3>
                    <p className="mb-2">Crear implementaciones paralelas sin reemplazar las originales:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Implementar versión mejorada junto a la original</li>
                      <li>Realizar pruebas A/B para verificar equivalencia visual</li>
                      <li>Medir y comparar rendimiento</li>
                      <li>Verificar comportamiento en diferentes dispositivos</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">3. Migración Gradual</h3>
                    <p className="mb-2">Reemplazar componentes originales de forma gradual:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Comenzar con componentes de baja visibilidad</li>
                      <li>Implementar feature flags para activar/desactivar nuevas implementaciones</li>
                      <li>Monitorear métricas de rendimiento en producción</li>
                      <li>Revertir cambios si se detectan problemas</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">4. Validación y Documentación Final</h3>
                    <p className="mb-2">Asegurar la calidad y documentar el proceso:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Realizar pruebas de regresión visual</li>
                      <li>Documentar mejoras de rendimiento</li>
                      <li>Actualizar guías de desarrollo</li>
                      <li>Capacitar al equipo en el nuevo enfoque</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Cronograma de Implementación</CardTitle>
                <CardDescription>Plan de trabajo para la refactorización gradual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Fase 1: Preparación (Completada)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Documentación de animaciones existentes</li>
                      <li>Creación de sistema de tokens</li>
                      <li>Implementación de hooks de animación</li>
                      <li>Soporte para prefers-reduced-motion</li>
                      <li>Monitoreo de rendimiento</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Fase 2: Componentes de Alta Prioridad (Semana 1-2)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>IntroAnimation - 3 días</li>
                      <li>WordsCarousel - 2 días</li>
                      <li>ProductCarousel - 3 días</li>
                      <li>SectionsNavigation - 2 días</li>
                      <li>Pruebas y validación - 2 días</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Fase 3: Componentes de Media Prioridad (Semana 3-4)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>PoetrySection - 2 días</li>
                      <li>Menu - 2 días</li>
                      <li>Contact - 2 días</li>
                      <li>Footer - 1 día</li>
                      <li>Pruebas y validación - 3 días</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Fase 4: Componentes de Baja Prioridad (Semana 5)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>StaticBackground - 1 día</li>
                      <li>ProductItem - 1 día</li>
                      <li>About - 1 día</li>
                      <li>Hero - 1 día</li>
                      <li>Pruebas finales - 1 día</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Fase 5: Finalización (Semana 6)</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Documentación final</li>
                      <li>Análisis de métricas de rendimiento</li>
                      <li>Presentación de resultados</li>
                      <li>Capacitación al equipo</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validation">
            <Card>
              <CardHeader>
                <CardTitle>Validación y Métricas</CardTitle>
                <CardDescription>Métodos para validar que no hay cambios en la experiencia visual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Validación Visual</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Pruebas A/B</strong> - Comparar versiones originales y refactorizadas
                      </li>
                      <li>
                        <strong>Capturas de pantalla automatizadas</strong> - Comparar imágenes frame por frame
                      </li>
                      <li>
                        <strong>Grabaciones de sesiones</strong> - Analizar comportamiento real de usuarios
                      </li>
                      <li>
                        <strong>Revisión por pares</strong> - Validación por diseñadores y desarrolladores
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Métricas de Rendimiento</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>FPS (Frames por segundo)</strong> - Medir fluidez de animaciones
                      </li>
                      <li>
                        <strong>Tiempo de carga</strong> - Medir tiempo hasta interactividad
                      </li>
                      <li>
                        <strong>Uso de CPU</strong> - Medir consumo de recursos
                      </li>
                      <li>
                        <strong>Uso de memoria</strong> - Medir fugas de memoria
                      </li>
                      <li>
                        <strong>Web Vitals</strong> - Medir métricas de experiencia de usuario
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Criterios de Éxito</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Equivalencia visual</strong> - No hay diferencias perceptibles en animaciones
                      </li>
                      <li>
                        <strong>Mejora de rendimiento</strong> - Mínimo 10% de mejora en FPS
                      </li>
                      <li>
                        <strong>Reducción de memoria</strong> - Mínimo 15% de reducción en uso de memoria
                      </li>
                      <li>
                        <strong>Accesibilidad</strong> - 100% de soporte para prefers-reduced-motion
                      </li>
                      <li>
                        <strong>Mantenibilidad</strong> - Reducción de 30% en líneas de código de animación
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Herramientas de Validación</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        <strong>Lighthouse</strong> - Análisis de rendimiento y accesibilidad
                      </li>
                      <li>
                        <strong>Chrome DevTools</strong> - Análisis de rendimiento y memoria
                      </li>
                      <li>
                        <strong>Percy</strong> - Pruebas de regresión visual
                      </li>
                      <li>
                        <strong>Hooks personalizados</strong> - Monitoreo de FPS y rendimiento
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
