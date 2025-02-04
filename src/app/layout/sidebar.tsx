import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Building2, Home, Settings } from "lucide-react";
import { NavBuildings } from "./nav-buildings";
import NavSettings from "./nav-settings";
import { NavBuilding } from "./nav-building";



const data = { 
    navMain: [
        {
            name: "Home",
            url:"/",
            icon: Home
        }
    ],
    navBuildings: [
        {
            title:"Buildings",
            url:"Buildings",
            icon:Building2,
            isActive:true,
            items:[
                {
                    title: "Bergeron",
                    url:"Bergeron"
                },
                {
                    title: "Petrie A",
                    url:"Petrie-A"
                },
                {
                    title: "Petrie B",
                    url:"Petrie-B"
                }
            ]
        }
    ],
    navSettings: [
        {
            name: "Settings",
            url:"Settings",
            icon: Settings
        }
    ],
    
    

}
export function AppSidebar1(){
    return(
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavBuildings items={data.navBuildings}/>
                <NavSettings items= {data.navSettings}/>
                <NavBuilding/>
            </SidebarContent>
            <SidebarRail/>
        </Sidebar>
    )
   
}