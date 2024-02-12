"use client";

import { useState, useEffect, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import Tools from '@/components/editor/tools'
import EditEditor from '@/components/editor/edit-editor';
import EditorSidebar from '@/components/editor/editor-sidebar';
import ToolView from '@/components/editor/tool-view';
import { ComponentProps } from '@/types/type';
import { useColorStore } from '@/hooks/color';
import { useOpacityStore } from '@/hooks/opacity';
import { useToolStore } from '@/hooks/tools';
import { useZIndexStore } from '@/hooks/z-index';
import { useBannerImageStore } from '@/hooks/banner';


const Editor = () => {
    const { state, name } = useToolStore()
    const { color, setColor } = useColorStore();
    const { opacity, setOpacity } = useOpacityStore();
    const { image, setImage } = useBannerImageStore();
    const { zindex, setZIndex } = useZIndexStore()

    const [rotate, setRotate] = useState(0)
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(0)
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)

    const [padding, setPadding] = useState(0)
    const [font, setFont] = useState(0)
    const [weight, setWeight] = useState(0)

    const main_obj = {
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

    const [current_component, setCurrentComponent] = useState<ComponentProps>(main_obj)

    const [components, setComponents] = useState<ComponentProps[]>([
        main_obj
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

    const moveElement = (id: string, currentInfo: ComponentProps) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = (event: MouseEvent) => {
            if (!currentDiv) return;

            const { movementX, movementY } = event;
            const getStyle = window.getComputedStyle(currentDiv)
            const left = parseInt(getStyle.left)
            const top = parseInt(getStyle.top)
            if (isMoving) {
                currentDiv.style.left = `${left + movementX}px`
                currentDiv.style.top = `${top + movementY}px`
            }
        }

        const mouseUp = (event: MouseEvent) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            if (!currentDiv) return;
            setLeft(parseInt(currentDiv.style.left))
            setTop(parseInt(currentDiv.style.top))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const resizeElement = (id: string, currentInfo: ComponentProps) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = (event: MouseEvent) => {
            if (!currentDiv) return;

            const { movementX, movementY } = event;
            const getStyle = window.getComputedStyle(currentDiv)
            const width = parseInt(getStyle.width)
            const height = parseInt(getStyle.height)
            if (isMoving) {
                currentDiv.style.width = `${width + movementX}px`
                currentDiv.style.height = `${height + movementY}px`
            }
        }

        const mouseUp = (event: MouseEvent) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            if (!currentDiv) return;
            setWidth(parseInt(currentDiv.style.width))
            setHeight(parseInt(currentDiv.style.height))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const rotateElement = (id: string, currentInfo: ComponentProps) => {
        setCurrentComponent(main_obj)
        setCurrentComponent(currentInfo)

        const target = document.getElementById(id)

        const mouseMove = (event: MouseEvent) => {
            if (!target) return;

            const { movementX, movementY } = event;
            const getStyle = window.getComputedStyle(target)

            const trans = getStyle.transform

            const values = trans.split('(')[1].split(')')[0].split(',')

            const angle = Math.round(Math.atan2(parseInt(values[1]), parseInt(values[0])) * (180 / Math.PI))

            let deg = angle < 0 ? angle + 360 : angle

            if (movementX) {
                deg = deg + movementX
            }
            target.style.transform = `rotate(${deg}deg)`

        }
        const mouseUp = () => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)

            if (!target) return;

            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values = trans.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(parseInt(values[1]), parseInt(values[0])) * (180 / Math.PI))
            let deg = angle < 0 ? angle + 360 : angle
            setRotate(deg)

        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    useEffect(() => {
        if (current_component) {
            const index = components.findIndex(c => c.id === current_component.id)
            const temp = components.filter(c => c.id !== current_component.id)

            if (current_component.name !== 'text') {
                components[index].width = width || current_component.width
                components[index].height = height || current_component.height
                components[index].rotate = rotate || current_component.rotate
            }

            if (current_component.name === 'text') {
                components[index].font = font || current_component.font
                components[index].padding = padding || current_component.padding
                components[index].weight = weight || current_component.weight
            }

            if (current_component.name === 'main_frame' && image) {
                components[index].image = image || current_component.image
            }

            components[index].color = color || current_component.color

            if (current_component.name !== 'main_frame') {
                components[index].left = left || current_component.left
                components[index].top = top || current_component.top
                components[index].opacity = opacity || current_component.opacity
                components[index].z_index = parseInt(zindex) || current_component.z_index
            }

            setComponents([...temp, components[index]])

            setColor('')
            setWidth(0)
            setHeight(0)
            setTop(0)
            setLeft(0)
            setRotate(0)
            setOpacity('')
            setZIndex('')
        }
    }, [color, image, left, top, width, height, opacity, zindex,padding,font,weight])

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
                            setFont={setFont}
                            setWeight={setWeight}
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
                    <EditorSidebar
                        current_component={current_component}
                        setPadding={setPadding}
                        setFont={setFont}
                        setWeight={setWeight}
                    />
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