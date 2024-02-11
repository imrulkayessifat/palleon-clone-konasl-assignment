"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
    Form,
    FormLabel,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useColorStore } from "@/hooks/color";

const SidebarSchema = z.object({
    color: z.string(),
})

const EditorSidebar = () => {
    const { setColor } = useColorStore();
    const form = useForm<z.infer<typeof SidebarSchema>>({
        resolver: zodResolver(SidebarSchema),
        defaultValues: {
            color: '#ffbe6f',
        }
    });

    const onSubmit = async (data: z.infer<typeof SidebarSchema>) => {
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-3 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input
                                        id="picture"
                                        type="color"
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                            setColor(e.target.value)
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}

export default EditorSidebar