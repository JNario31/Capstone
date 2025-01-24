import type { ChartConfig } from "@/components/ui/chart"
import { BuildingChart } from "@/lib/charts/chart"

const temperatureConfig: ChartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
}

const humidityConfig: ChartConfig = {
  humidity: {
    label: "Humidity",
    color: "hsl(var(--chart-2))",
  },
}

const pressureConfig: ChartConfig = {
    pressure: {
        label: "Pressure",
        color: "hsl(var(--chart-3))",
    }
}

const airflowConfig: ChartConfig = {
    airflow: {
        label: "Airflow",
        color: "hsl(var(--chart-4))",
    }
}

export default function Page() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <BuildingChart
        building="Bergeron"
        title="Temperature Chart - Bergeron"
        description="Real-time temperature data"
        dataKey="temperature"
        socketUrl="http://localhost:4000"
        chartConfig={temperatureConfig}
      />
      <BuildingChart
        building="Bergeron"
        title="Humidity Chart - Another Building"
        description="Real-time humidity data"
        dataKey="humidity"
        socketUrl="http://localhost:4000"
        chartConfig={humidityConfig}
      />
      <BuildingChart
        building="Bergeron"
        title="Pressure Chart"
        description="Real-time humidity data"
        dataKey="pressure"
        socketUrl="http://localhost:4000"
        chartConfig={pressureConfig}
      />
       <BuildingChart
        building="Bergeron"
        title="Airflow Chart"
        description="Real-time Airflow data"
        dataKey="airflow"
        socketUrl="http://localhost:4000"
        chartConfig={airflowConfig}
      />
    </div>
  )
}

