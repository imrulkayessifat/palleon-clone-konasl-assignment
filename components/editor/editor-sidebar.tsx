"use client";

import { useState, useEffect } from "react";
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
import { Slider } from "@/components/ui/slider"
import { useColorStore } from "@/hooks/color";
import { useOpacityStore } from "@/hooks/opacity";
import { useZIndexStore } from "@/hooks/z-index";
import { ComponentProps } from "@/types/type";

const SidebarSchema = z.object({
    color: z.string(),
    opacity: z.string(),
    z_index: z.string({
        required_error: "Value Must not less than 1!",
    })
})

interface EditorSidebarProps {
    current_component: ComponentProps
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
    current_component
}) => {

    const opacityValue = current_component.opacity !== undefined ? current_component.opacity : '1';

    const { setColor } = useColorStore();
    const { setOpacity } = useOpacityStore();
    const { setZIndex } = useZIndexStore()
    const [sliderValue, setSliderValue] = useState(1);
    const form = useForm<z.infer<typeof SidebarSchema>>({
        resolver: zodResolver(SidebarSchema),
        defaultValues: {
            color: '#ffbe6f',
            opacity: current_component.opacity,
            z_index: current_component.z_index.toString()
        }
    });

    const onSubmit = async (data: z.infer<typeof SidebarSchema>) => {
        console.log(data)
    }

    useEffect(() => {
        setSliderValue(parseFloat(opacityValue))
    }, [current_component.opacity])

    return (
        <div className="flex flex-col gap-3 ">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
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
                    {
                        current_component.name !== 'main_frame' && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="opacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex items-center gap-3'>
                                                <FormLabel>Opacity</FormLabel>
                                                <span className='border px-2 rounded'>
                                                    {sliderValue}
                                                </span>
                                            </div>
                                            <FormControl>
                                                <Slider
                                                    className='my-5'
                                                    onValueChange={(value: number[]) => {
                                                        setSliderValue(value[0]);
                                                        setOpacity(value[0].toString())
                                                        field.onChange(value);
                                                    }}
                                                    min={0}
                                                    max={1}
                                                    step={0.1}
                                                    // defaultValue={[Math.floor(current_component.opacity)]}
                                                    value={[parseFloat(opacityValue)]}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="z_index"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Z-Index</FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="picture"
                                                    type="number"
                                                    min={"1"}
                                                    value={current_component.z_index}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setZIndex(e.target.value)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

export default EditorSidebar