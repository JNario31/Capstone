"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"

const formSchema = z.object({
    name: z.string().min(1, "Sensor name is required"),
    buildingId: z.string().min(1, "Select a building")
})

export function AddSensorForm(){
    const [buildings, setBuildings] = useState<{id: number; name: string}[]>([])
    useEffect(()=>{
        axios.get("http://localhost:4000/buildings")
            .then(response=> setBuildings(response.data))
            .catch(error=> console.error("Error fetching buidlings",error))
    },[])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          buildingId: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>){
        try {
            const response = await axios.post(`http://localhost:4000/buildings/${values.buildingId}/sensors`, {
              name: values.name,
              building_id: Number(values.buildingId),
            })
      
            alert(response.data.message || "Sensor added successfully!")
            form.reset()
          } catch (error: any) {
            console.error("Error:", error)
            alert(error.response?.data?.message || "Error adding sensor")
          }
    }

    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Sensor Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sensor Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter sensor name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            {/* Building Selection */}
            <FormField
              control={form.control}
              name="buildingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Building</FormLabel>
                  <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a building" />
                      </SelectTrigger>
                      <SelectContent>
                        {buildings.map((building) => (
                          <SelectItem key={building.id} value={String(building.id)}>
                            {building.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
    
            <Button type="submit">Add Sensor</Button>
          </form>
        </Form>
    )
}

