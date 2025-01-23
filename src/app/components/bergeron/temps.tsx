"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import io from "socket.io-client"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"


type ChartData = {
  timestamp: string;
  temperature: string;
};

const chartConfig = {
  bergeron: {
    label: "Temperaure",
    color: "hsl(var(--chart-1))",
  },

} satisfies ChartConfig
const socket = io("http://localhost:4000");

export function Component() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const chartDataRef = useRef<ChartData[]>([]);
  
    const isDataDifferent = useCallback((newData: ChartData[], currentData: ChartData[]) => {
        if (newData.length !== currentData.length) return true
        return JSON.stringify(newData) !== JSON.stringify(currentData)
      }, [])
      
    const memoizedChartData = useMemo(() => chartData, [chartData])

    const handleTemperature = useCallback(
        (data: ChartData[]) => {
            console.log("Incoming data from server:", data)
      
            const existingDates = new Set(chartDataRef.current.map((item) => item.timestamp))
            const filteredData = data.filter((item) => !existingDates.has(item.timestamp))
      
            if (filteredData.length > 0) {
              const newData = [...chartDataRef.current, ...filteredData].sort(
                (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
              )
      
              if (isDataDifferent(newData, chartDataRef.current)) {
                chartDataRef.current = newData
                setChartData(newData)
              }
            }
          },
          [isDataDifferent],
    )

 useEffect(() => {
        socket.on("connect", () => {
          console.log("Connected to the server")
          socket.emit("request_data",{building: "Bergeron"})
        })
    
        socket.on("chart_data", handleTemperature)
    
        return () => {
          socket.off("chart_data", handleTemperature)
        }
      }, [handleTemperature])
  

  console.log(chartData);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="timestamp"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis/>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="temperature" type="monotone" stroke="var(--color-bergeron)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
