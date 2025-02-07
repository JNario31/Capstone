import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SensorDrawer } from "@/lib/sensorform/sensorDrawer";
import { SubDrawer } from "@/lib/subscribeform/subscribeDrawer";
import { Separator } from "@radix-ui/react-separator";

export default function Settings(){
    return(
        <div className="container mx-auto p-4 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Subscription Settings</CardTitle>
                    <CardDescription>Subscribe for monitoring system alerts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <div>
                            <SubDrawer name={"Subscribe"} title={"Subscribe"} description={"Input your email for system alerts"} action={"subscribe"}/>
                        </div>
                        <div>
                            <SubDrawer name={"Unsubscribe"} title={"Unsubscribe"} description={"Input your email to no longer receive system alerts"} action={"unsubscribe"}/>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sensor Settings</CardTitle>
                    <CardDescription>Sensors installed in corresponding buildings</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4">
                        <SensorDrawer name={"Add Sensor"} title={"Add Sensor"} description={"Input a sensor name and select the building for the sensor."}/>
                    </div>
                </CardContent>
            </Card>
        </div>
        
            
    )
}