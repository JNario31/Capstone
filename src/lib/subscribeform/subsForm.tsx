"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type SubFormProps = {
  action: string;
}

//Form schema, validate email
const formSchema = z.object({
    email: z.string().email("Invalid Email Address")
})

export function SubForm({action}: SubFormProps){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

  async function onSubmit(values: z.infer<typeof formSchema>){
      try {
        const response = await fetch(`http://localhost:4000/email/${action}`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if(!response.ok){
          throw new Error(data.message || "Error");
        }

        alert(data.message || `Sucessfully ${action}d!`);
      } catch (error: any) {
        console.error("Error:", error);
        alert(error.message || "Error");
      }
        console.log(values)
    }

    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input placeholder="email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    )
}


