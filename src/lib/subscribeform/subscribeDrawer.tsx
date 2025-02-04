import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { SubForm } from "./subsForm";

type SubscriptionDrawerProps = {
    name: string,
    title: string,
    description:string,
    action: string,
}

export function SubDrawer({name, title, description, action}: SubscriptionDrawerProps){
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
                        <SubForm action={action}/>
                        </div>
                    </div>
                    </div>
                </DrawerContent>
        </Drawer>
    )
}