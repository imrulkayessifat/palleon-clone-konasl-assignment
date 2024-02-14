"use client"

import { ChangeEvent, useState } from 'react';
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MdDraw } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { Button } from '@/components/ui/button';
import { ComponentProps } from '@/types/type';

const FormSchema = z.object({
    name: z.string(),
    type: z.string(),
    width: z.string(),
    color: z.string()
})

interface DrawProps {
    setCurrentComponent: (component: ComponentProps) => void;
    components: ComponentProps[],
    setComponents: (components: ComponentProps[]) => void;
    moveElement: (id: string, currentInfo: ComponentProps) => void
    resizeElement: (id: string, currentInfo: ComponentProps) => void
}

const Draw: React.FC<DrawProps> = ({
    setCurrentComponent,
    components,
    setComponents,
    moveElement,
    resizeElement,
}) => {
    const [name, setName] = useState(false)
    const [brush, setBrush] = useState({
        name: 'draw',
        type: 'pencil',
        width: '1',
        color: '#000000'
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: 'draw',
            type: 'pencil',
            width: '1',
            color: '#000000'
        }
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const style = {
            id: Date.now(),
            name: data.name,
            type: brush.type,
            z_index: 15,
            color: brush.color,
            width: parseInt(brush.width),
            setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a),
            moveElement,
            resizeElement,
        }
        setComponents([...components, style])
    }

    return (
        <div className='flex flex-col gap-3'>
            <Button
                onClick={() => {
                    setName(!name);
                }}
                className='flex gap-2 w-full' variant={"outline"}
            >
                {
                    !name ? (
                        <MdDraw className='w-5 h-5' />
                    ) : (
                        <RxCross2 className='w-5 h-5' />
                    )
                }
                <span>{!name ? "Start Drawing" : 'Stop Drawing'}</span>
            </Button>

            {
                name && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brush Type</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                setBrush(prevState => ({ ...prevState, type: value }));
                                                field.onChange
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a brush type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="pencil">Pencil</SelectItem>
                                                <SelectItem value="circle">Circle</SelectItem>
                                                <SelectItem value="spray">Spray</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="width"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brush Width</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                defaultValue={1}
                                                min={1}
                                                step={1}
                                                max={1000}
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    setBrush(prevState => ({ ...prevState, width: e.target.value }));
                                                    field.onChange(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="color"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brush Color</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="picture"
                                                type="color"
                                                onChange={(e) => {
                                                    setBrush(prevState => ({ ...prevState, color: e.target.value }));
                                                    field.onChange(e.target.value);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit'>Submit</Button>
                        </form>
                    </Form>
                )
            }

        </div>
    )
}

export default Draw