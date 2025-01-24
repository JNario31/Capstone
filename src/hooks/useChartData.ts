import { ChartData } from "@/app/types/chart"
import { useCallback, useEffect, useRef, useState } from "react"
import io from "socket.io-client"


export function useChartData(socketUrl: string, building: string) {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const chartDataRef = useRef<ChartData[]>([])
  const socketRef = useRef<ReturnType<typeof io> | null>(null)

  const isDataDifferent = useCallback((newData: ChartData[], currentData: ChartData[]) => {
    if (newData.length !== currentData.length) return true
    return JSON.stringify(newData) !== JSON.stringify(currentData)
  }, [])

  const handleData = useCallback(
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
    socketRef.current = io(socketUrl)

    socketRef.current.on("connect", () => {
      console.log("Connected to the server")
      socketRef.current?.emit("request_data", { building })
    })

    socketRef.current.on("chart_data", handleData)

    return () => {
      socketRef.current?.off("chart_data", handleData)
      socketRef.current?.disconnect()
    }
  }, [socketUrl, building, handleData])

  return chartData
}

