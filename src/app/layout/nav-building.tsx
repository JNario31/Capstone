"use client"
import { useEffect, useState } from "react"
import axios from 'axios'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Building2, ChevronRight } from "lucide-react"
import Link from "next/link"

interface Building{
    id: number
    name: string
}

interface Sensor{
    id: number
    name: string
}

export function NavBuilding(){
    const [buildings, setBuildings] = useState<(Building & {sensors: Sensor[]})[]>([])

    useEffect(()=>{
        const fetchBuildings = async () =>{
            try {
                const buildingsResponse = await axios.get('http://localhost:4000/buildings')
                const buildingsWithSensors = await Promise.all(
                    buildingsResponse.data.map(async (building: Building) => {
                        const sensorsResponse = await axios.get(`http://localhost:4000/buildings/${building.id}/sensors`)
                        return{
                            ...building,
                            sensors: sensorsResponse.data
                        }
                    })
                )
                setBuildings(buildingsWithSensors)
            } catch (error){
                console.error('Failed to fetch buildings', error)
            }
        }
        fetchBuildings()
    },[])

    return(
        <SidebarGroup>
            <SidebarGroupLabel>Buildings</SidebarGroupLabel>
            <SidebarMenu>
                {buildings.map((building) => (
                    <Collapsible
                        key={building.id}
                        asChild
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={building.name}>
                                    <>
                                    <Building2/>
                                    <span>{building.name}</span>
                                    <ChevronRight className="ml-auto transition-transform duration-200 group-open:rotate-90" />
                                    </>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {building.sensors.map((sensor) => (
                                        <SidebarMenuSubItem key={sensor.id}>
                                            <SidebarMenuSubButton>
                                                <Link href={`/building/${building.name}/sensor/${sensor.name}`}>
                                                    <span>{sensor.name}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}