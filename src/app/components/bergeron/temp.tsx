"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import io from "socket.io-client"
import { useEffect, useRef, useState } from "react"


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

export function Component() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const chartDataRef = useRef<ChartData[]>([]);
  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      //console.log("Connected to the server");
      socket.emit("request_data",{building:"Bergeron"});
    });

    socket.on("chart_data", (data: ChartData[]) => {
      //console.log("Incoming data from server:", data);

      // Use ref to manage data updates
      const existingDates = new Set(chartDataRef.current.map((item) => item.timestamp));
      const filteredData = data.filter((item) => !existingDates.has(item.timestamp));

      // Update the ref directly
      chartDataRef.current = [...chartDataRef.current, ...filteredData];

      // Sync with state to trigger re-render
      setChartData([...chartDataRef.current]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  

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
