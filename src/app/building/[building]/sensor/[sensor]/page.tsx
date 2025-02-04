import type { ChartConfig } from "@/components/ui/chart"
import { airflowConfig, humidityConfig, pressureConfig, temperatureConfig } from "@/config/chartConfig"
import { SensorChart } from "@/lib/charts/chart"

interface SensorPageProps {
  params: { building: string; sensor: string }
}

export default async function Page({ params }: SensorPageProps) {
  const { building, sensor } = await params

  const sensorChartConfig: Record<string, ChartConfig> = {
    temperature: temperatureConfig,
    humidity: humidityConfig,
    pressure: pressureConfig,
    airflow: airflowConfig,
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Sensor: {sensor} in {building}</h1>
      <SensorChart
        sensor={sensor}
        title={`${sensor} Chart - ${building}`}
        description={`Real-time ${sensor} data`}
        dataKey={"temperature"}
        socketUrl="http://localhost:4000"
        chartConfig={sensorChartConfig[sensor.toLowerCase()] || temperatureConfig}
      />
            <h1 className="text-2xl font-bold">Sensor: {sensor} in {building}</h1>
      <SensorChart
        sensor={sensor}
        title={`${sensor} Chart - ${building}`}
        description={`Real-time ${sensor} data`}
        dataKey={"humidity"}
        socketUrl="http://localhost:4000"
        chartConfig={sensorChartConfig[sensor.toLowerCase()] || humidityConfig}
      />
      <SensorChart
        sensor={sensor}
        title={`${sensor} Chart - ${building}`}
        description={`Real-time ${sensor} data`}
        dataKey={"airflow"}
        socketUrl="http://localhost:4000"
        chartConfig={sensorChartConfig[sensor.toLowerCase()] || airflowConfig}
      />
      <SensorChart
        sensor={sensor}
        title={`${sensor} Chart - ${building}`}
        description={`Real-time ${sensor} data`}
        dataKey={"pressure"}
        socketUrl="http://localhost:4000"
        chartConfig={sensorChartConfig[sensor.toLowerCase()] || pressureConfig}
      />
    </div>
  )
}
