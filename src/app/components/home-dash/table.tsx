"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { TabsList, Tabs, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BuildingTable } from "@/lib/table/table";
import { DownloadButton } from "@/lib/ui/DownloadButton";
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Building } from "lucide-react";
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
                            <DownloadButton building={building}/>
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