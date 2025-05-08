"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { animationTokens } from "@/hooks/use-animation-tokens"

/**
 * Componente de documentación que muestra las animaciones existentes
 * sin modificar sus valores originales
 */
export default function AnimationCatalog() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Catálogo de Animaciones</h1>

      <Tabs defaultValue="existing">
        <TabsList className="mb-8">
          <TabsTrigger value="existing">Animaciones Existentes</TabsTrigger>
          <TabsTrigger value="tokens">Tokens de Animación</TabsTrigger>
          <TabsTrigger value="guidelines">Guías de Uso</TabsTrigger>
        </TabsList>

        <TabsContent value="existing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimationCard
              title="Basic Animation"
              description="Animación básica de elementos geométricos"
              values={{
                duration: animationTokens.duration.existing.basicAnimation,
                ease: animationTokens.ease.existing.basicAnimation,
              }}
            />

            <AnimationCard
              title="Text Animation"
              description="Animación de caracteres de texto"
              values={{
                duration: animationTokens.duration.existing.textAnimation,
                ease: animationTokens.ease.existing.textAnimation,
                stagger: animationTokens.stagger.existing.textAnimation,
              }}
            />

            <AnimationCard
              title="Scroll Animation"
              description="Animación activada por scroll"
              values={{
                duration: animationTokens.duration.existing.scrollAnimation,
                ease: animationTokens.ease.existing.scrollAnimation,
                stagger: animationTokens.stagger.existing.scrollAnimation,
              }}
            />

            <AnimationCard
              title="Hover Animation"
              description="Animación activada por hover"
              values={{
                duration: animationTokens.duration.existing.hoverAnimation,
                ease: animationTokens.ease.existing.hoverAnimation,
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="tokens">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TokenCard title="Duraciones" tokens={animationTokens.duration} excludeKeys={["existing"]} />

            <TokenCard title="Easings" tokens={animationTokens.ease} excludeKeys={["existing"]} />

            <TokenCard title="Staggers" tokens={animationTokens.stagger} excludeKeys={["existing"]} />
          </div>
        </TabsContent>

        <TabsContent value="guidelines">
          <Card>
            <CardHeader>
              <CardTitle>Guías para Nuevas Animaciones</CardTitle>
              <CardDescription>
                Recomendaciones para mantener la consistencia sin afectar las animaciones existentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Principios Generales</h3>
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
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente para mostrar una animación existente
interface AnimationCardProps {
  title: string
  description: string
  values: Record<string, string | number>
}
function AnimationCard({ title, description, values }: AnimationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(values).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="font-medium">{key}:</span>
              <span>{String(value)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar tokens de animación
interface TokenCardProps {
  title: string
  tokens: Record<string, string | number | Record<string, string | number>>
  excludeKeys?: string[]
}
function TokenCard({ title, tokens, excludeKeys = [] }: TokenCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(tokens)
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="font-medium">{key}:</span>
                <span>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
