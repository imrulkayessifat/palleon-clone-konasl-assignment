"use client";

import { useState, useEffect, SetStateAction } from 'react';

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
    const { color, setColor } = useColorStore();
    const { image, setImage } = useBannerImageStore();

    const [rotate, setRotate] = useState(0)
    const [current_component, setCurrentComponent] = useState<ComponentProps>({
        name: "main_frame",
        type: "rect",
        id: 1,
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
            id: 1,
            height: 450,
            width: 650,
            z_index: 1,
            color: '#ffbe6f',
            image: "",
            setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a)
        }
    ])

    const removeComponent = (id: number) => {
        const temp = components.filter(c => c.id !== id)
        setCurrentComponent({
            name: "main_frame",
            type: "rect",
            id: 1,
            height: 450,
            width: 650,
            z_index: 1,
            color: '#ffbe6f',
            image: "",
            setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a)
        })
        setComponents(temp)
    }

    const removeBackground = () => {
        setImage('')
        setComponents(prevComponents => prevComponents.map(component => ({
            ...component,
            image: ''
        })));
    }

    const createShape = (name: string, type: string) => {
        const style = {
            id: Date.now(),
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            image: '',
            color: '#3c3c3d',
            setCurrentComponent: (a: SetStateAction<ComponentProps>) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setComponents([...components, style])
    }

    const moveElement = () => {

    }

    const resizeElement = () => {

    }

    const rotateElement = () => {

    }


    useEffect(() => {
        if (current_component) {

            const index = components.findIndex(c => c.id === current_component.id)
            const temp = components.filter(c => c.id !== current_component.id)

            if (current_component.name === 'main_frame' && image) {
                components[index].image = image || current_component.image
            }

            components[index].color = color || current_component.color

            setComponents([...temp, components[index]])

            setColor('')
        }
    }, [color, image])

    return (
        <div className='mt-24'>
            <div className='flex mx-auto px-8'>
                <Tools />
                {
                    state && name && (
                        <ToolView
                            setCurrentComponent={setCurrentComponent}
                            components={components}
                            setComponents={setComponents}
                            rotate={rotate}
                            moveElement={moveElement}
                            resizeElement={resizeElement}
                            rotateElement={rotateElement}
                            data={name}
                        />
                    )
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