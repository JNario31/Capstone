"use client"
import { TableProps } from "@/app/types/misc";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useChartData } from "@/hooks/useChartData";


export function BuildingTable({socketUrl, building}: TableProps) {
  const data = useChartData(socketUrl, building);

  const cutData = data.slice(-15);
  const reversedData = cutData.reverse();
  console.log(data)
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Table>
          <TableCaption>Most Recent Data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Timestamp</TableHead>
              <TableHead>Temperature</TableHead>
              <TableHead>Humidity</TableHead>
              <TableHead>Pressure</TableHead>
              <TableHead>Airflow</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {reversedData.map((data, index) => (
          <TableRow key={`${data.timestamp}-${index}`}>
            <TableCell>{data.timestamp}</TableCell>
            <TableCell>{data.temperature}</TableCell>
            <TableCell>{data.humidity}</TableCell>
            <TableCell>{data.pressure}</TableCell>
            <TableCell>{data.airflow}</TableCell>
          </TableRow>
          ))}
          </TableBody>
        </Table>
      </div>
    )
  }