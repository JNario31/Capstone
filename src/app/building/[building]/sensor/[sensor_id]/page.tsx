'use client'

import { airflowConfig, humidityConfig, pressureConfig, temperatureConfig } from "@/config/chartConfig"
import { SensorChart } from "@/lib/charts/chart"
import type { ChartConfig } from "@/components/ui/chart"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from 'axios'

interface BuildingInfo {
    id: number
    name: string
}

interface SensorInfo {
    id: number
    name: string
}

export default function Page() {
    const params = useParams()
    const buildingId = params.building as string
    const sensorId = params.sensor_id as string
    console.log(sensorId)
    const [buildingName, setBuildingName] = useState<string>("")
    const [sensorName, setSensorName] = useState<string>("")

    useEffect(() => {
        const fetchNames = async () => {
          console.log('ID:',sensorId)
            try {
                // Fetch building name
                const buildingResponse = await axios.get(`http://localhost:4000/buildings/${buildingId}`)
                setBuildingName(buildingResponse.data.name)

                // Fetch sensor name
                const sensorResponse = await axios.get(`http://localhost:4000/sensors/${sensorId}`)
                setSensorName(sensorResponse.data.name)
            } catch (error) {
                console.error('Failed to fetch names:', error)
            }
        }
        fetchNames()
    }, [buildingId, sensorId])

    const sensorChartConfig: Record<string, ChartConfig> = {
        temperature: temperatureConfig,
        humidity: humidityConfig,
        pressure: pressureConfig,
        airflow: airflowConfig,
    }

    return (
        <div className="container mx-auto p-4 space-y-8">
            <h1 className="text-2xl font-bold">
                {sensorName ? `Sensor: ${sensorName}` : 'Loading...'} 
                {buildingName ? ` in ${buildingName}` : ''}
            </h1>
            {(['temperature', 'humidity', 'airflow', 'pressure'] as const).map((dataKey) => (
                <SensorChart
                    key={dataKey}
                    sensor_id={sensorId}
                    title={`${dataKey} Chart - ${buildingName || 'Loading...'}`}
                    description={`Real-time ${dataKey} data`}
                    dataKey={dataKey}
                    socketUrl="http://localhost:4000"
                    chartConfig={sensorChartConfig[dataKey] || temperatureConfig}
                />
            ))}
        </div>
    )
}