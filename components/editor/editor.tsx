"use client";

import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Tools from '@/components/editor/tools'
import EditEditor from '@/components/editor/edit-editor';
import EditorSidebar from '@/components/editor/editor-sidebar';
import ToolView from '@/components/editor/tool-view';
import { ComponentProps } from '@/types/type';
import { useColorStore } from '@/hooks/color';
import { useToolStore } from '@/hooks/tools';
import { useBannerImageStore } from '@/hooks/banner';

const Editor = () => {
    const { state, name } = useToolStore()
    const { color } = useColorStore();
    const { image, setImage } = useBannerImageStore();

    const [current_component, setCurrentComponent] = useState<ComponentProps>({
        name: "main_frame",
        type: "rect",
        id: Math.floor((Math.random() * 100) + 1),
        height: 450,
        width: 650,
        z_index: 1,
        color: '#ffbe6f',
        image: "",
        setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a)
    })

    const [components, setComponents] = useState<ComponentProps[]>([
        {
            name: "main_frame",
            type: "rect",
            id: Math.floor((Math.random() * 100) + 1),
            height: 450,
            width: 650,
            z_index: 1,
            color: '#ffbe6f',
            image: "",
            setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a)
        }
    ])

    const removeComponent = (id: number) => {
        console.log(id);
    }

    const removeBackground = () => {
        setImage('')
        setComponents(prevComponents => prevComponents.map(component => ({
            ...component,
            image: image
        })));
    }

    useEffect(() => {
        setComponents(prevComponents => prevComponents.map(component => ({
            ...component,
            color: color,
            image: image
        })));
    }, [color, image]);

    return (
        <div className='mt-24'>
            <div className='flex mx-auto px-8'>
                <Tools />
                {
                    state && name && <ToolView data={name} />
                }
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                        <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
                            {
                                components.map((data, i) => (
                                    <EditEditor
                                        key={i}
                                        info={data}
                                        current_component={current_component}
                                        removeComponent={removeComponent}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='h-full w-[250px] justify-start items-start'>
                    <EditorSidebar />
                    {
                        image.length > 0 && (
                            <Button className='mt-5 px-10' onClick={removeBackground} variant={"outline"}>
                                Remove Banner
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Editor