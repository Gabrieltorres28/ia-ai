"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@/components/metric-card"
import { LineChart } from "@/components/line-chart"
import { BarChart } from "@/components/bar-chart"
import { Brain, Users, Target, AlertTriangle, TrendingUp } from "lucide-react"

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    activeUsers: 12847,
    predictions: 3421,
    accuracy: 94.2,
    errors: 23,
  })

  // Actualizar métricas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeUsers: Math.floor(prev.activeUsers + (Math.random() - 0.5) * 200),
        predictions: Math.floor(prev.predictions + Math.random() * 50),
        accuracy: Math.max(85, Math.min(99, prev.accuracy + (Math.random() - 0.5) * 2)),
        errors: Math.max(0, Math.floor(prev.errors + (Math.random() - 0.5) * 5)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              awí TORREí anal-y-isis ETICAL IA 
            </h1>
          </div>
          <p className="text-gray-400 mt-2">Monitoreo en tiempo real de tu plataforma de inteligencia artificial</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Usuarios Activos"
            value={metrics.activeUsers.toLocaleString()}
            icon={Users}
            trend="+12%"
            color="blue"
          />
          <MetricCard
            title="Predicciones Hechas"
            value={metrics.predictions.toLocaleString()}
            icon={TrendingUp}
            trend="+8%"
            color="green"
          />
          <MetricCard
            title="Tasa de Precisión"
            value={`${metrics.accuracy.toFixed(1)}%`}
            icon={Target}
            trend="+2.1%"
            color="purple"
          />
          <MetricCard
            title="Errores Detectados"
            value={metrics.errors.toString()}
            icon={AlertTriangle}
            trend="-5%"
            color="red"
          />
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChart />
          <BarChart />
        </div>
      </main>
    </div>
  )
}
