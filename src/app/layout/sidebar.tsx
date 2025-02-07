import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { Building2, Home, Settings } from "lucide-react";
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
    navSettings: [
        {
            name: "Settings",
            url:"/Settings",
            icon: Settings
        }
    ],
    
    

}
export function AppSidebar1(){
    return(
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavBuilding/>
                <NavSettings items= {data.navSettings}/>
                
            </SidebarContent>
            <SidebarRail/>
        </Sidebar>
    )
   
}