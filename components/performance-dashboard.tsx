"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAnimationMetrics, generatePerformanceReport } from "@/hooks/use-animation-performance"
import { Button } from "@/components/ui/button"
import { Download, RefreshCw } from "lucide-react"

interface PerformanceMetrics {
  fps: number
  minFps: number
  maxFps: number
  avgFps: number
  frameCount: number
  droppedFrames: number
  lastUpdated: number
}

export function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<Record<string, PerformanceMetrics>>({})
  const [report, setReport] = useState<any>(null)
  const [refreshCount, setRefreshCount] = useState(0)

  // Actualizar métricas periódicamente
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({ ...getAnimationMetrics() })
    }

    // Actualizar inmediatamente
    updateMetrics()

    // Configurar intervalo de actualización
    const intervalId = setInterval(updateMetrics, 2000)

    return () => {
      clearInterval(intervalId)
    }
  }, [refreshCount])

  const handleGenerateReport = () => {
    const newReport = generatePerformanceReport()
    setReport(newReport)

    // Opcional: Guardar en localStorage para persistencia
    localStorage.setItem("animationPerformanceReport", JSON.stringify(newReport))
  }

  const handleDownloadReport = () => {
    if (!report) return

    const reportBlob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(reportBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = `performance-report-${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.json`
    document.body.appendChild(a)
    a.click()

    // Limpiar
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  }

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1)
  }

  // Determinar el color basado en el valor de FPS
  const getFpsColor = (fps: number) => {
    if (fps >= 55) return "text-green-500"
    if (fps >= 30) return "text-yellow-500"
    return "text-red-500"
  }

  // Calcular el porcentaje de frames perdidos
  const getDroppedFramePercentage = (metrics: PerformanceMetrics) => {
    if (metrics.frameCount === 0) return 0
    return (metrics.droppedFrames / (metrics.frameCount + metrics.droppedFrames)) * 100
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Dashboard de Rendimiento</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
          <Button variant="outline" size="sm" onClick={handleGenerateReport}>
            Generar Reporte
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownloadReport} disabled={!report}>
            <Download className="h-4 w-4 mr-2" />
            Descargar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="metrics">
        <TabsList className="mb-4">
          <TabsTrigger value="metrics">Métricas en Vivo</TabsTrigger>
          <TabsTrigger value="report">Reporte</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(metrics).length > 0 ? (
              Object.entries(metrics).map(([label, data]) => (
                <Card key={label}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{label}</CardTitle>
                    <CardDescription>
                      Última actualización: {new Date(data.lastUpdated).toLocaleTimeString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>FPS Actual:</span>
                        <span className={getFpsColor(data.fps)}>{data.fps.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FPS Promedio:</span>
                        <span className={getFpsColor(data.avgFps)}>{data.avgFps.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FPS Mínimo:</span>
                        <span className={getFpsColor(data.minFps)}>{data.minFps.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>FPS Máximo:</span>
                        <span>{data.maxFps.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frames Perdidos:</span>
                        <span className={data.droppedFrames > 5 ? "text-red-500" : "text-gray-500"}>
                          {data.droppedFrames} ({getDroppedFramePercentage(data).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frames Totales:</span>
                        <span>{data.frameCount}</span>
                      </div>

                      {/* Barra de progreso visual para FPS */}
                      <div className="mt-4">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              data.avgFps >= 55 ? "bg-green-500" : data.avgFps >= 30 ? "bg-yellow-500" : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(100, (data.avgFps / 60) * 100)}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>0</span>
                          <span>30</span>
                          <span>60</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  No hay métricas disponibles. Navega por la aplicación para generar datos.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="report">
          {report ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen del Reporte</CardTitle>
                  <CardDescription>Generado el {new Date(report.timestamp).toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Componentes Monitoreados</div>
                      <div className="text-2xl font-bold">{report.summary.totalComponents}</div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">FPS Promedio</div>
                      <div className={`text-2xl font-bold ${getFpsColor(report.summary.avgFps)}`}>
                        {report.summary.avgFps.toFixed(1)}
                      </div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Frames Perdidos Totales</div>
                      <div className="text-2xl font-bold">{report.summary.totalDroppedFrames}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="border p-4 rounded-lg">
                      <div className="text-sm font-medium mb-2">Mejor Rendimiento</div>
                      <div className="flex justify-between">
                        <span>{report.summary.bestPerformer}</span>
                        <span className="text-green-500 font-bold">{report.summary.bestFps.toFixed(1)} FPS</span>
                      </div>
                    </div>
                    <div className="border p-4 rounded-lg">
                      <div className="text-sm font-medium mb-2">Peor Rendimiento</div>
                      <div className="flex justify-between">
                        <span>{report.summary.worstPerformer}</span>
                        <span className={`font-bold ${getFpsColor(report.summary.worstFps)}`}>
                          {report.summary.worstFps.toFixed(1)} FPS
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Datos Detallados</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-slate-100 p-4 rounded-lg overflow-auto max-h-96 text-xs">
                    {JSON.stringify(report.metrics, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No hay reportes generados. Haz clic en "Generar Reporte" para crear uno.
              </p>
              <Button onClick={handleGenerateReport}>Generar Reporte</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones de Optimización</CardTitle>
              <CardDescription>Basadas en las métricas recopiladas y mejores prácticas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Componentes Críticos</h3>
                  <p className="mb-2">Los siguientes componentes pueden necesitar optimización adicional:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {Object.entries(metrics).map(([label, data]) => {
                      if (data.avgFps < 40 || data.droppedFrames > 10) {
                        return (
                          <li key={label} className="text-red-500">
                            <span className="font-medium">{label}</span> - {data.avgFps.toFixed(1)} FPS,{" "}
                            {data.droppedFrames} frames perdidos
                          </li>
                        )
                      }
                      return null
                    })}
                    {!Object.entries(metrics).some(([_, data]) => data.avgFps < 40 || data.droppedFrames > 10) && (
                      <li className="text-green-500">No se detectaron componentes críticos</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Optimizaciones Generales</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Utiliza <code>will-change</code> solo en elementos que realmente se animarán
                    </li>
                    <li>Asegúrate de limpiar todas las animaciones en el retorno de useEffect</li>
                    <li>
                      Considera usar <code>transform</code> y <code>opacity</code> para animaciones más fluidas
                    </li>
                    <li>Reduce la complejidad de las animaciones en dispositivos móviles</li>
                    <li>Implementa lazy loading para componentes pesados</li>
                    <li>
                      Utiliza <code>useCallback</code> y <code>useMemo</code> para funciones y valores que se usan en
                      animaciones
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Accesibilidad</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Verifica que todas las animaciones respeten <code>prefers-reduced-motion</code>
                    </li>
                    <li>Proporciona alternativas estáticas para usuarios que prefieren reducir el movimiento</li>
                    <li>Asegúrate de que las animaciones no bloqueen la interacción del usuario</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
