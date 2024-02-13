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
import { useRadiusStore } from "@/hooks/radius";
import { ComponentProps } from "@/types/type";

const SidebarSchema = z.object({
    color: z.string(),
    opacity: z.string(),
    z_index: z.string(),
    padding: z.number(),
    font: z.number(),
    weight: z.number(),
    radius: z.number()
})

interface EditorSidebarProps {
    current_component: ComponentProps;
    setPadding: (data: number) => void;
    setFont: (data: number) => void;
    setWeight: (data: number) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
    current_component,
    setPadding,
    setFont,
    setWeight
}) => {

    const opacityValue = current_component.opacity !== undefined ? current_component.opacity : '1';

    const { setColor } = useColorStore();
    const { setOpacity } = useOpacityStore();
    const { setZIndex } = useZIndexStore();
    const { setRadius } = useRadiusStore();
    const [sliderValue, setSliderValue] = useState(1);
    const form = useForm<z.infer<typeof SidebarSchema>>({
        resolver: zodResolver(SidebarSchema),
        defaultValues: {
            color: '#ffbe6f',
            opacity: current_component.opacity,
            z_index: current_component.z_index.toString(),
            padding: current_component.padding,
            font: current_component.font,
            weight: current_component.weight,
            radius: current_component.radius
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
                    {
                        current_component.name === 'text' && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="padding"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Padding</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    defaultValue={current_component.padding}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setPadding(parseInt(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="font"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Font</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    defaultValue={current_component.font}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setFont(parseInt(e.target.value))
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="weight"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Weight</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    defaultValue={current_component.weight}
                                                    min={100}
                                                    step={100}
                                                    max={900}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.value);
                                                        setWeight(parseInt(e.target.value))
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
                    {
                        current_component.name === 'image' && (
                            <FormField
                                control={form.control}
                                name="radius"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Radius</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                defaultValue={current_component.radius}
                                                min={1}
                                                onChange={(e) => {
                                                    field.onChange(e.target.value);
                                                    setRadius(parseInt(e.target.value))
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )
                    }
                </form>
            </Form>
        </div>
    )
}

export default EditorSidebar