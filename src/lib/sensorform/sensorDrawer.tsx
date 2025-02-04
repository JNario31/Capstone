import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AddSensorForm } from "./sensorForm";

type SensorDrawerProps = {
    name: string,
    title: string,
    description:string,
}

export function SensorDrawer({name, title, description}: SensorDrawerProps){
    return(
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"default"}>{name}</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className="flex flex-col items-center">
                            <DrawerTitle>{title}</DrawerTitle>
                            <DrawerDescription>{description}</DrawerDescription>
                        </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2">
                        <AddSensorForm/>
                        </div>
                    </div>
                    </div>
                </DrawerContent>
        </Drawer>
    )
}