"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BuildingTable } from "@/lib/table/table";
import { DownloadButton } from "@/lib/ui/DownloadButton";
import { useState } from "react";

export default function BuildingTables(){
    const [building, setBuilding] = useState("Bergeron");

    const handleTabChange = (newBuilding: string)=> {
        setBuilding(newBuilding);
    }
    console.log(building)

    return(
        <div className="container mx-auto p-4 space-y-8">
            <Tabs defaultValue="Bergeron" value={building} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Bergeron">Bergeron</TabsTrigger>
                    <TabsTrigger value="PetrieA">Petrie A</TabsTrigger>
                    <TabsTrigger value="PetrieB">Petrie B</TabsTrigger>
                </TabsList>
                <TabsContent value={building}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Building Databases </CardTitle>
                            <CardDescription>First 15 Data Points</CardDescription>
                            
                        </CardHeader>
                        <div className="translate-x-4">
                            <DownloadButton sensor={building}/>
                        </div>
                        <CardContent>
                            <BuildingTable key={building} socketUrl={"http://localhost:4000"} building={building}/>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    )  
}