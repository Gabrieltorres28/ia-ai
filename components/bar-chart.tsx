"use client"

import { useState, useEffect } from "react"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ModelData {
  model: string
  accuracy: number
  predictions: number
}

export function BarChart() {
  const [data, setData] = useState<ModelData[]>([
    { model: "GPT-4", accuracy: 94, predictions: 1250 },
    { model: "Claude", accuracy: 91, predictions: 980 },
    { model: "Gemini", accuracy: 89, predictions: 750 },
    { model: "LLaMA", accuracy: 87, predictions: 620 },
    { model: "PaLM", accuracy: 85, predictions: 450 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) =>
        prevData.map((item) => ({
          ...item,
          accuracy: Math.max(80, Math.min(98, item.accuracy + (Math.random() - 0.5) * 4)),
          predictions: Math.max(100, Math.floor(item.predictions + (Math.random() - 0.5) * 100)),
        })),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Comparativa de Modelos</CardTitle>
        <CardDescription className="text-gray-400">Rendimiento de diferentes modelos de IA</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="model" stroke="#9CA3AF" fontSize={12} />
              <YAxis stroke="#9CA3AF" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#F9FAFB",
                }}
              />
              <Bar dataKey="accuracy" fill="#10B981" name="Precisión (%)" radius={[4, 4, 0, 0]} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
