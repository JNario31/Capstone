import type { ChartConfig } from "@/components/ui/chart"

export type ChartData = {
  timestamp: string
  [key: string]: string | number
}

export type BuildingChartProps = {
  building: string
  title: string
  description: string
  dataKey: string
  socketUrl: string
  chartConfig: ChartConfig
}

