"use client"

import { chartData } from "@/app/fakedata/fakedata"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"


const chartConfig = {
  temp: {
    label: "Temperature",
  },
  bergeron: {
    label: "Bergeron",
    color: "hsl(var(--chart-1))",
  },
  petriea:{
    label: "Petrie A",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig


export default function HomeTempChart(){

return(
    <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Temperature</CardTitle>
                <CardDescription>
                    Temperature Monitor of all Buildings
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full">
                <AreaChart data = {chartData}>
                    <defs>
                        <linearGradient id="fillBergeron" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-bergeron)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-bergeron)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>

                        <linearGradient id="fillPetrieA" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="var(--color-petriea)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="var(--color-petriea)"
                                stopOpacity={0.1}
                            />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false}/>
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                    }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `${value}°C`}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={
                            <ChartTooltipContent
                            labelFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                })
                            }}
                            indicator="dot"
                            />
                        }
                    />

                    <Area
                        dataKey="bergeron"
                        type="natural"
                        fill="url(#fillBergeron)"
                        stroke="var(--color-bergeron)"
                        stackId="a"
                    />

                    <Area
                        dataKey="petriea"
                        type="natural"
                        fill="url(#fillPetrieA)"
                        stroke="var(--color-petriea)"
                        stackId="a"
                    />
                </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
)

}

