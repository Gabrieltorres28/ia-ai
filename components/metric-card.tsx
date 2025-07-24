"use client"

import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: "blue" | "green" | "purple" | "red"
}

const colorClasses = {
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-400",
    trend: "text-blue-400",
  },
  green: {
    bg: "bg-green-500/10",
    icon: "text-green-400",
    trend: "text-green-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-400",
    trend: "text-purple-400",
  },
  red: {
    bg: "bg-red-500/10",
    icon: "text-red-400",
    trend: "text-red-400",
  },
}

export function MetricCard({ title, value, icon: Icon, trend, color }: MetricCardProps) {
  const colors = colorClasses[color]

  return (
    <Card className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-400">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${colors.bg}`}>
          <Icon className={`w-4 h-4 ${colors.icon}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white mb-1">{value}</div>
        <p className={`text-xs ${colors.trend} flex items-center gap-1`}>
          {trend}
          <span className="text-gray-500">vs mes anterior</span>
        </p>
      </CardContent>
    </Card>
  )
}
