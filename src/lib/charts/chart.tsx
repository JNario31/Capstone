"use client"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useChartData } from "@/hooks/useChartData"
import { SensorChartProps } from "@/app/types/chart"
import { DownloadButton } from "../ui/DownloadButton"



export function SensorChart({ sensor, title, description, dataKey, socketUrl, chartConfig }: SensorChartProps) {
  const chartData = useChartData(socketUrl, sensor)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}        
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300}>
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
                axisLine={true}
                tickMargin={8}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }}
              />
              <YAxis
              axisLine={false}/>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey={dataKey} type="monotone" stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
          <DownloadButton building={sensor}/>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

