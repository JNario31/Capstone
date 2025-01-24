import { airflowConfig, humidityConfig, pressureConfig, temperatureConfig } from "@/config/chartConfig";
import { BuildingChart } from "@/lib/charts/chart";

export default function PetrieBTemperatureChart(){
  return(
    <div className="container mx-auto p-4 space-y-8">
    <BuildingChart
      building="PetrieB"
      title="Temperature Chart"
      description="Real-time temperature data"
      dataKey="temperature"
      socketUrl="http://localhost:4000"
      chartConfig={temperatureConfig}
    />
    <BuildingChart
      building="PetrieB"
      title="Humidity Chart"
      description="Real-time humidity data"
      dataKey="humidity"
      socketUrl="http://localhost:4000"
      chartConfig={humidityConfig}
    />
    <BuildingChart
      building="PetrieB"
      title="Pressure Chart"
      description="Real-time humidity data"
      dataKey="pressure"
      socketUrl="http://localhost:4000"
      chartConfig={pressureConfig}
    />
      <BuildingChart
      building="PetrieB"
      title="Airflow Chart"
      description="Real-time Airflow data"
      dataKey="airflow"
      socketUrl="http://localhost:4000"
      chartConfig={airflowConfig}
    />
  </div>
  )
}