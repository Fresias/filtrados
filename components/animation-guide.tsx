"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
// @ts-expect-error: Declaración para importación minificada de GSAP
// eslint-disable-next-line
import { gsap } from "gsap/dist/gsap.min.js"

export function AnimationGuide() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedSnippet(snippetId)
      setTimeout(() => setCopiedSnippet(null), 2000)
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-2">Guía de Animaciones GSAP</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Una guía completa para implementar animaciones optimizadas con GSAP en el proyecto Filtrados
      </p>

      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visión General</TabsTrigger>
          <TabsTrigger value="hooks">Hooks Personalizados</TabsTrigger>
          <TabsTrigger value="tokens">Sistema de Tokens</TabsTrigger>
          <TabsTrigger value="examples">Ejemplos Prácticos</TabsTrigger>
          <TabsTrigger value="performance">Rendimiento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Visión General del Sistema de Animaciones</CardTitle>
              <CardDescription>
                Nuestro enfoque para crear animaciones consistentes, accesibles y de alto rendimiento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Principios Fundamentales</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Consistencia Visual:</strong> Todas las animaciones siguen patrones y tiempos consistentes
                    definidos en nuestro sistema de tokens.
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Todas las animaciones respetan la preferencia{" "}
                    <code>prefers-reduced-motion</code> y ofrecen alternativas para usuarios que prefieren reducir el
                    movimiento.
                  </li>
                  <li>
                    <strong>Rendimiento:</strong> Las animaciones están optimizadas para mantener 60fps incluso en
                    dispositivos de gama media.
                  </li>
                  <li>
                    <strong>Mantenibilidad:</strong> El código de animación está centralizado en hooks personalizados
                    para facilitar su mantenimiento y evolución.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Arquitectura del Sistema</h3>
                <p className="mb-4">Nuestro sistema de animaciones se compone de tres capas principales:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">1. Capa de Tokens</h4>
                    <p className="text-sm text-muted-foreground">
                      Define valores consistentes para duraciones, easings, delays y staggers que se utilizan en toda la
                      aplicación.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">2. Capa de Hooks</h4>
                    <p className="text-sm text-muted-foreground">
                      Proporciona abstracciones para crear, gestionar y monitorear animaciones de manera eficiente.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">3. Capa de Componentes</h4>
                    <p className="text-sm text-muted-foreground">
                      Implementa las animaciones utilizando los hooks y tokens para crear experiencias visuales
                      coherentes.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Flujo de Trabajo Recomendado</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    Identifica los elementos que necesitan animación y el tipo de animación (entrada, salida,
                    interacción, etc.).
                  </li>
                  <li>
                    Consulta el sistema de tokens para utilizar valores consistentes con el resto de la aplicación.
                  </li>
                  <li>
                    Utiliza los hooks personalizados para implementar la animación de manera eficiente y accesible.
                  </li>
                  <li>Monitorea el rendimiento utilizando las herramientas de diagnóstico proporcionadas.</li>
                  <li>Documenta cualquier decisión o patrón nuevo para mantener la coherencia del sistema.</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hooks">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>useGsapAnimation</CardTitle>
                <CardDescription>Hook principal para crear y gestionar animaciones GSAP</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Este hook proporciona una interfaz declarativa para crear animaciones GSAP con limpieza automática y
                  soporte para preferencias de accesibilidad.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `const animation = useGsapAnimation({
  type: "fade", // "fade", "slide", "scale", "custom"
  target: elementRef,
  scrollTrigger: {
    trigger: triggerRef.current,
    start: "top 80%",
  },
  duration: 0.8,
  ease: "power2.out",
  delay: 0.2,
});

// Controlar la animación
animation.play();
animation.pause();
animation.reverse();
animation.restart();`,
                        "useGsapAnimation",
                      )
                    }
                  >
                    {copiedSnippet === "useGsapAnimation" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`const animation = useGsapAnimation({
  type: "fade", // "fade", "slide", "scale", "custom"
  target: elementRef,
  scrollTrigger: {
    trigger: triggerRef.current,
    start: "top 80%",
  },
  duration: 0.8,
  ease: "power2.out",
  delay: 0.2,
});

// Controlar la animación
animation.play();
animation.pause();
animation.reverse();
animation.restart();`}
                  </pre>
                </div>

                <h4 className="font-medium">Parámetros</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <code>type</code>: Tipo de animación predefinida o "custom" para animaciones personalizadas.
                  </li>
                  <li>
                    <code>target</code>: Referencia al elemento o elementos a animar.
                  </li>
                  <li>
                    <code>scrollTrigger</code>: Configuración para activar la animación al hacer scroll (opcional).
                  </li>
                  <li>
                    <code>duration</code>, <code>ease</code>, <code>delay</code>: Parámetros de la animación.
                  </li>
                  <li>
                    <code>customAnimation</code>: Función para definir animaciones personalizadas cuando type es
                    "custom".
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>useAnimationTokens</CardTitle>
                <CardDescription>Hook para acceder al sistema de tokens de animación</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Este hook proporciona acceso a los tokens de animación definidos en el sistema, permitiendo mantener
                  la consistencia visual.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `// Obtener tokens generales
const { duration, ease, stagger } = useAnimationTokens();

// Obtener tokens específicos para un componente
const { duration, ease, stagger } = useAnimationTokens("menuAnimation");

// Acceder a todos los tokens
const { allTokens } = useAnimationTokens();`,
                        "useAnimationTokens",
                      )
                    }
                  >
                    {copiedSnippet === "useAnimationTokens" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`// Obtener tokens generales
const { duration, ease, stagger } = useAnimationTokens();

// Obtener tokens específicos para un componente
const { duration, ease, stagger } = useAnimationTokens("menuAnimation");

// Acceder a todos los tokens
const { allTokens } = useAnimationTokens();`}
                  </pre>
                </div>

                <h4 className="font-medium">Valores Disponibles</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <code>duration</code>: Duración de la animación (en segundos).
                  </li>
                  <li>
                    <code>ease</code>: Función de easing para la animación.
                  </li>
                  <li>
                    <code>stagger</code>: Tiempo de escalonamiento para animaciones múltiples.
                  </li>
                  <li>
                    <code>delay</code>: Tiempo de espera antes de iniciar la animación.
                  </li>
                  <li>
                    <code>repeat</code>: Número de repeticiones de la animación.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>useReducedMotion</CardTitle>
                <CardDescription>Hook para detectar la preferencia de reducción de movimiento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Este hook detecta si el usuario ha activado la preferencia de reducción de movimiento en su sistema
                  operativo.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `const prefersReducedMotion = useReducedMotion();

// Adaptar la animación según la preferencia
if (prefersReducedMotion) {
  // Versión simplificada de la animación
  gsap.to(element, { opacity: 1, duration: 0.3 });
} else {
  // Versión completa de la animación
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  });
}`,
                        "useReducedMotion",
                      )
                    }
                  >
                    {copiedSnippet === "useReducedMotion" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`const prefersReducedMotion = useReducedMotion();

// Adaptar la animación según la preferencia
if (prefersReducedMotion) {
  // Versión simplificada de la animación
  gsap.to(element, { opacity: 1, duration: 0.3 });
} else {
  // Versión completa de la animación
  gsap.to(element, {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power2.out"
  });
}`}
                  </pre>
                </div>

                <h4 className="font-medium">Mejores Prácticas</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Siempre verifica esta preferencia antes de aplicar animaciones complejas.</li>
                  <li>
                    Para usuarios que prefieren reducir el movimiento, simplifica las animaciones o elimínalas por
                    completo.
                  </li>
                  <li>
                    Considera reducir la duración, eliminar movimientos y mantener solo cambios de opacidad para estos
                    usuarios.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>useAnimationPerformance</CardTitle>
                <CardDescription>Hook para monitorear el rendimiento de las animaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Este hook permite monitorear el rendimiento de las animaciones en tiempo real, ayudando a identificar
                  y solucionar problemas.
                </p>

                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `// Monitorear el rendimiento de un componente específico
const performance = useAnimationPerformance("ComponentName", true);

// Controlar manualmente el monitoreo
performance.start();
performance.stop();

// Obtener métricas actuales
const metrics = performance.getMetrics();
console.log(metrics.fps, metrics.droppedFrames);

// Generar un informe completo
import { generatePerformanceReport } from "@/hooks/use-animation-performance";
const report = generatePerformanceReport();`,
                        "useAnimationPerformance",
                      )
                    }
                  >
                    {copiedSnippet === "useAnimationPerformance" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`// Monitorear el rendimiento de un componente específico
const performance = useAnimationPerformance("ComponentName", true);

// Controlar manualmente el monitoreo
performance.start();
performance.stop();

// Obtener métricas actuales
const metrics = performance.getMetrics();
console.log(metrics.fps, metrics.droppedFrames);

// Generar un informe completo
import { generatePerformanceReport } from "@/hooks/use-animation-performance";
const report = generatePerformanceReport();`}
                  </pre>
                </div>

                <h4 className="font-medium">Métricas Disponibles</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>
                    <code>fps</code>: Frames por segundo actuales.
                  </li>
                  <li>
                    <code>avgFps</code>: Promedio de frames por segundo.
                  </li>
                  <li>
                    <code>minFps</code>: Mínimo de frames por segundo registrado.
                  </li>
                  <li>
                    <code>maxFps</code>: Máximo de frames por segundo registrado.
                  </li>
                  <li>
                    <code>droppedFrames</code>: Número de frames perdidos.
                  </li>
                  <li>
                    <code>frameCount</code>: Número total de frames procesados.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Tokens de Animación</CardTitle>
              <CardDescription>
                Valores predefinidos para mantener la consistencia visual en todas las animaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Categorías de Tokens</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Duraciones</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <code>fast</code>: 0.3s - Micro-interacciones
                      </li>
                      <li>
                        <code>medium</code>: 0.6s - Transiciones estándar
                      </li>
                      <li>
                        <code>slow</code>: 0.9s - Transiciones complejas
                      </li>
                      <li>
                        <code>extraSlow</code>: 1.5s - Animaciones de atención
                      </li>
                    </ul>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Easings</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <code>standard</code>: "power2.out" - Uso general
                      </li>
                      <li>
                        <code>bounce</code>: "back.out(1.7)" - Efecto rebote
                      </li>
                      <li>
                        <code>elastic</code>: "elastic.out(1, 0.3)" - Efecto elástico
                      </li>
                      <li>
                        <code>smooth</code>: "sine.inOut" - Transiciones suaves
                      </li>
                      <li>
                        <code>sharp</code>: "power3.inOut" - Transiciones marcadas
                      </li>
                    </ul>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Staggers</h4>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <code>fast</code>: 0.05s - Elementos pequeños
                      </li>
                      <li>
                        <code>medium</code>: 0.1s - Elementos medianos
                      </li>
                      <li>
                        <code>slow</code>: 0.2s - Elementos grandes
                      </li>
                      <li>
                        <code>extraSlow</code>: 0.3s - Efectos dramáticos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Uso de Tokens</h3>
                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `import { useAnimationTokens } from "@/hooks/use-animation-tokens";

// En tu componente
function MyComponent() {
  // Obtener tokens generales
  const { duration, ease, stagger } = useAnimationTokens();
  
  // O tokens específicos para un componente
  const { duration, ease } = useAnimationTokens("menuAnimation");
  
  useEffect(() => {
    // Usar los tokens en tus animaciones
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      stagger: stagger
    });
  }, []);
  
  return <div>...</div>;
}`,
                        "tokenUsage",
                      )
                    }
                  >
                    {copiedSnippet === "tokenUsage" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`import { useAnimationTokens } from "@/hooks/use-animation-tokens";

// En tu componente
function MyComponent() {
  // Obtener tokens generales
  const { duration, ease, stagger } = useAnimationTokens();
  
  // O tokens específicos para un componente
  const { duration, ease } = useAnimationTokens("menuAnimation");
  
  useEffect(() => {
    // Usar los tokens en tus animaciones
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
      stagger: stagger
    });
  }, []);
  
  return <div>...</div>;
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Tokens Específicos por Componente</h3>
                <p className="mb-4">
                  Algunos componentes tienen tokens específicos documentados para mantener su comportamiento original:
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="border p-2 text-left">Componente</th>
                        <th className="border p-2 text-left">Duración</th>
                        <th className="border p-2 text-left">Easing</th>
                        <th className="border p-2 text-left">Stagger</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2">IntroAnimation</td>
                        <td className="border p-2">0.2s</td>
                        <td className="border p-2">power3.out</td>
                        <td className="border p-2">0.05s</td>
                      </tr>
                      <tr>
                        <td className="border p-2">WordsCarousel</td>
                        <td className="border p-2">20s</td>
                        <td className="border p-2">linear</td>
                        <td className="border p-2">-</td>
                      </tr>
                      <tr>
                        <td className="border p-2">SectionsNavigation</td>
                        <td className="border p-2">0.5s</td>
                        <td className="border p-2">power2.out</td>
                        <td className="border p-2">0.1s</td>
                      </tr>
                      <tr>
                        <td className="border p-2">ProductCarousel</td>
                        <td className="border p-2">0.6s</td>
                        <td className="border p-2">power2.out</td>
                        <td className="border p-2">0.15s</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Animación de Entrada Básica</CardTitle>
                <CardDescription>Ejemplo de animación de entrada con fade y slide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `"use client"

import { useRef, useEffect } from "react"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function FadeInSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease } = useAnimationTokens()

  // Configurar animación con el hook personalizado
  useGsapAnimation({
    type: "slide", // Tipo predefinido (fade, slide, scale)
    target: contentRef, // Elemento a animar
    trigger: sectionRef, // Elemento que activa la animación
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    },
    // Personalizar valores si es necesario
    duration: prefersReducedMotion ? 0.3 : duration,
    ease: ease,
  })

  return (
    <section ref={sectionRef} className="py-12">
      <div ref={contentRef} className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Sección con Animación</h2>
        <p>Este contenido aparecerá con una animación de entrada suave.</p>
      </div>
    </section>
  )
}`,
                        "basicExample",
                      )
                    }
                  >
                    {copiedSnippet === "basicExample" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`"use client"

import { useRef, useEffect } from "react"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function FadeInSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease } = useAnimationTokens()

  // Configurar animación con el hook personalizado
  useGsapAnimation({
    type: "slide", // Tipo predefinido (fade, slide, scale)
    target: contentRef, // Elemento a animar
    trigger: sectionRef, // Elemento que activa la animación
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
    },
    // Personalizar valores si es necesario
    duration: prefersReducedMotion ? 0.3 : duration,
    ease: ease,
  })

  return (
    <section ref={sectionRef} className="py-12">
      <div ref={contentRef} className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Sección con Animación</h2>
        <p>Este contenido aparecerá con una animación de entrada suave.</p>
      </div>
    </section>
  )
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animación de Hover</CardTitle>
                <CardDescription>Ejemplo de animación de hover con GSAP</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `"use client"

import { useRef, useEffect } from "react"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import gsap from "gsap"

export function HoverCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease } = useAnimationTokens("hoverAnimation")
  
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    
    // Crear timeline para la animación (pausado inicialmente)
    const tl = gsap.timeline({ paused: true })
    
    // Configurar animación según preferencia de reducción de movimiento
    if (!prefersReducedMotion) {
      tl.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: duration,
        ease: ease,
      })
    } else {
      // Versión simplificada para usuarios que prefieren reducir el movimiento
      tl.to(card, {
        boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.2,
      })
    }
    
    // Añadir event listeners
    const handleMouseEnter = () => tl.play()
    const handleMouseLeave = () => tl.reverse()
    
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)
    
    // Limpiar event listeners y timeline
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
      tl.kill()
    }
  }, [prefersReducedMotion, duration, ease])
  
  return (
    <div 
      ref={cardRef} 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
    >
      <h3 className="text-xl font-bold mb-2">Tarjeta con Hover</h3>
      <p>Pasa el cursor por encima para ver la animación.</p>
    </div>
  )
}`,
                        "hoverExample",
                      )
                    }
                  >
                    {copiedSnippet === "hoverExample" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`"use client"

import { useRef, useEffect } from "react"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import gsap from "gsap"

export function HoverCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease } = useAnimationTokens("hoverAnimation")
  
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    
    // Crear timeline para la animación (pausado inicialmente)
    const tl = gsap.timeline({ paused: true })
    
    // Configurar animación según preferencia de reducción de movimiento
    if (!prefersReducedMotion) {
      tl.to(card, {
        y: -10,
        scale: 1.03,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: duration,
        ease: ease,
      })
    } else {
      // Versión simplificada para usuarios que prefieren reducir el movimiento
      tl.to(card, {
        boxShadow: "0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        duration: 0.2,
      })
    }
    
    // Añadir event listeners
    const handleMouseEnter = () => tl.play()
    const handleMouseLeave = () => tl.reverse()
    
    card.addEventListener("mouseenter", handleMouseEnter)
    card.addEventListener("mouseleave", handleMouseLeave)
    
    // Limpiar event listeners y timeline
    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter)
      card.removeEventListener("mouseleave", handleMouseLeave)
      tl.kill()
    }
  }, [prefersReducedMotion, duration, ease])
  
  return (
    <div 
      ref={cardRef} 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer"
    >
      <h3 className="text-xl font-bold mb-2">Tarjeta con Hover</h3>
      <p>Pasa el cursor por encima para ver la animación.</p>
    </div>
  )
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Animación de Secuencia</CardTitle>
                <CardDescription>Ejemplo de animación secuencial con timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `"use client"

import { useRef, useState } from "react"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"

export function SequenceAnimation() {
  const elementsRef = useRef<HTMLDivElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease, stagger } = useAnimationTokens("timelineAnimation")
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }
  
  // Crear la animación usando el hook (pero no ejecutarla automáticamente)
  const animation = useGsapAnimation({
    type: "custom",
    target: elementsRef,
    customAnimation: (tl, targets) => {
      // Reset positions
      tl.set(targets, { clearProps: "all" })
      
      if (!prefersReducedMotion) {
        // Animación completa
        tl.from(targets[0], {
          x: -200,
          opacity: 0,
          duration: duration,
          ease: ease,
        })
        .from(
          targets[1],
          {
            y: 100,
            opacity: 0,
            duration: duration,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          targets[2],
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: duration,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.4"
        )
        .from(
          targets[3],
          {
            x: 200,
            opacity: 0,
            duration: duration,
            ease: ease,
          },
          "-=0.4"
        )
      } else {
        // Animación simplificada
        tl.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power1.out",
          }
        )
      }
    },
  })
  
  const playAnimation = () => {
    setIsPlaying(true)
    animation.restart()
    
    // Reset isPlaying state when animation completes
    setTimeout(() => {
      setIsPlaying(false)
    }, prefersReducedMotion ? 1000 : 3000)
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center items-center gap-6">
        <div ref={addToRefs} className="w-20 h-20 bg-rose-500 rounded-md" />
        <div ref={addToRefs} className="w-20 h-20 bg-amber-500 rounded-full" />
        <div ref={addToRefs} className="w-20 h-20 bg-emerald-500 rounded-md rotate-45" />
        <div ref={addToRefs} className="w-20 h-20 bg-sky-500 rounded-md" />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={playAnimation}
          disabled={isPlaying}
        >
          {isPlaying ? "Animando..." : "Reproducir Secuencia"}
        </Button>
      </div>
    </div>
  )
}`,
                        "sequenceExample",
                      )
                    }
                  >
                    {copiedSnippet === "sequenceExample" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`"use client"

import { useRef, useState } from "react"
import { useGsapAnimation } from "@/hooks/use-gsap-animation"
import { useAnimationTokens } from "@/hooks/use-animation-tokens"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Button } from "@/components/ui/button"

export function SequenceAnimation() {
  const elementsRef = useRef<HTMLDivElement[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  
  // Obtener tokens de animación
  const { duration, ease, stagger } = useAnimationTokens("timelineAnimation")
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el)
    }
  }
  
  // Crear la animación usando el hook (pero no ejecutarla automáticamente)
  const animation = useGsapAnimation({
    type: "custom",
    target: elementsRef,
    customAnimation: (tl, targets) => {
      // Reset positions
      tl.set(targets, { clearProps: "all" })
      
      if (!prefersReducedMotion) {
        // Animación completa
        tl.from(targets[0], {
          x: -200,
          opacity: 0,
          duration: duration,
          ease: ease,
        })
        .from(
          targets[1],
          {
            y: 100,
            opacity: 0,
            duration: duration,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .from(
          targets[2],
          {
            scale: 0,
            rotation: 180,
            opacity: 0,
            duration: duration,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.4"
        )
        .from(
          targets[3],
          {
            x: 200,
            opacity: 0,
            duration: duration,
            ease: ease,
          },
          "-=0.4"
        )
      } else {
        // Animación simplificada
        tl.fromTo(
          targets,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power1.out",
          }
        )
      }
    },
  })
  
  const playAnimation = () => {
    setIsPlaying(true)
    animation.restart()
    
    // Reset isPlaying state when animation completes
    setTimeout(() => {
      setIsPlaying(false)
    }, prefersReducedMotion ? 1000 : 3000)
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center items-center gap-6">
        <div ref={addToRefs} className="w-20 h-20 bg-rose-500 rounded-md" />
        <div ref={addToRefs} className="w-20 h-20 bg-amber-500 rounded-full" />
        <div ref={addToRefs} className="w-20 h-20 bg-emerald-500 rounded-md rotate-45" />
        <div ref={addToRefs} className="w-20 h-20 bg-sky-500 rounded-md" />
      </div>
      <div className="flex justify-center">
        <Button
          onClick={playAnimation}
          disabled={isPlaying}
        >
          {isPlaying ? "Animando..." : "Reproducir Secuencia"}
        </Button>
      </div>
    </div>
  )
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Optimización de Rendimiento</CardTitle>
              <CardDescription>Mejores prácticas para optimizar el rendimiento de las animaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Métricas Clave</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">FPS (Frames Por Segundo)</h4>
                    <p className="text-sm text-muted-foreground">
                      Objetivo: 60 FPS para animaciones fluidas. Valores por debajo de 30 FPS son perceptibles como
                      "entrecortados".
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Frames Perdidos</h4>
                    <p className="text-sm text-muted-foreground">
                      Objetivo: Minimizar los frames perdidos. Cada frame perdido puede causar saltos visibles en la
                      animación.
                    </p>
                  </div>
                  <div className="border p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Uso de CPU/GPU</h4>
                    <p className="text-sm text-muted-foreground">
                      Objetivo: Mantener el uso de recursos bajo para evitar sobrecalentamiento y consumo de batería en
                      dispositivos móviles.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Técnicas de Optimización</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Usar propiedades optimizadas:</strong> Prioriza <code>transform</code> y{" "}
                    <code>opacity</code> sobre otras propiedades que causan reflow.
                  </li>
                  <li>
                    <strong>Limitar elementos animados:</strong> Anima el menor número posible de elementos
                    simultáneamente.
                  </li>
                  <li>
                    <strong>Usar will-change:</strong> Aplica <code>will-change: transform, opacity</code> solo a
                    elementos que realmente se animarán.
                  </li>
                  <li>
                    <strong>Limpiar animaciones:</strong> Asegúrate de matar todas las animaciones cuando el componente
                    se desmonta.
                  </li>
                  <li>
                    <strong>Reducir complejidad en móviles:</strong> Detecta dispositivos móviles y simplifica las
                    animaciones.
                  </li>
                  <li>
                    <strong>Batch DOM updates:</strong> Agrupa las actualizaciones del DOM para reducir reflows.
                  </li>
                  <li>
                    <strong>Usar contain:</strong> Aplica <code>contain: content</code> o{" "}
                    <code>contain: layout paint style</code> para aislar partes del DOM.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Monitoreo de Rendimiento</h3>
                <div className="bg-slate-100 p-4 rounded-lg relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      copyToClipboard(
                        `// En tu componente
import { useAnimationPerformance } from "@/hooks/use-animation-performance";

function MyComponent() {
  // Activar monitoreo de rendimiento
  const performance = useAnimationPerformance("MyComponent", true);
  
  // Resto del componente...
  
  return <div>...</div>;
}

// Para ver un informe completo
import { generatePerformanceReport } from "@/hooks/use-animation-performance";

function PerformanceButton() {
  const handleClick = () => {
    const report = generatePerformanceReport();
    console.log(report);
    
    // Opcional: enviar a un servicio de análisis
    // fetch('/api/performance', {
    //   method: 'POST',
    //   body: JSON.stringify(report)
    // });
  };
  
  return <button onClick={handleClick}>Generar Informe</button>;
}`,
                        "performanceMonitoring",
                      )
                    }
                  >
                    {copiedSnippet === "performanceMonitoring" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-auto">
                    {`// En tu componente
import { useAnimationPerformance } from "@/hooks/use-animation-performance";

function MyComponent() {
  // Activar monitoreo de rendimiento
  const performance = useAnimationPerformance("MyComponent", true);
  
  // Resto del componente...
  
  return <div>...</div>;
}

// Para ver un informe completo
import { generatePerformanceReport } from "@/hooks/use-animation-performance";

function PerformanceButton() {
  const handleClick = () => {
    const report = generatePerformanceReport();
    console.log(report);
    
    // Opcional: enviar a un servicio de análisis
    // fetch('/api/performance', {
    //   method: 'POST',
    //   body: JSON.stringify(report)
    // });
  };
  
  return <button onClick={handleClick}>Generar Informe</button>;
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Dashboard de Rendimiento</h3>
                <p className="mb-4">
                  Hemos implementado un dashboard de rendimiento que puedes acceder en{" "}
                  <code>/performance-dashboard</code> para monitorear las métricas en tiempo real.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline" onClick={() => window.open("/performance-dashboard", "_blank")}>
                    Abrir Dashboard de Rendimiento
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
