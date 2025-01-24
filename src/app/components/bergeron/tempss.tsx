import { temperatureConfig } from "@/config/chartConfig";
import { BuildingChart } from "@/lib/charts/chart";

export default function Test() {
    return(<BuildingChart
        building="Bergeron"
        title="Temperature Chart - Bergeron"
        description="Real-time temperature data"
        dataKey="temperature"
        socketUrl="http://localhost:4000"
        chartConfig={temperatureConfig}
      />)
    
}