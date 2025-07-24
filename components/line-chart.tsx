"use client"

import { useState, useEffect } from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface DataPoint {
  time: string
  predictions: number
  accuracy: number
}

export function LineChart() {
  const [data, setData] = useState<DataPoint[]>([])

  useEffect(() => {
    // Generar datos iniciales
    const initialData: DataPoint[] = []
    const now = new Date()

    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      initialData.push({
        time: time.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
        predictions: Math.floor(Math.random() * 200) + 100,
        accuracy: Math.floor(Math.random() * 15) + 85,
      })
    }

    setData(initialData)

    // Actualizar datos cada 5 segundos
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1)]
        const now = new Date()
        newData.push({
          time: now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
          predictions: Math.floor(Math.random() * 200) + 100,
          accuracy: Math.floor(Math.random() * 15) + 85,
        })
        return newData
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Evolución Temporal</CardTitle>
        <CardDescription className="text-gray-400">Predicciones y precisión en las últimas 24 horas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Line
                type="monotone"
                dataKey="predictions"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Predicciones"
                dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#8B5CF6"
                strokeWidth={2}
                name="Precisión (%)"
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
