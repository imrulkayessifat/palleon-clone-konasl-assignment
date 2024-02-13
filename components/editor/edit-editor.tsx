import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";

import Element from '@/components/editor/element';
import { Button } from '@/components/ui/button';
import { ComponentProps } from '@/types/type';

interface EditEditorProps {
    info: ComponentProps;
    current_component: ComponentProps;
    removeComponent: (id: number) => void
}

const EditEditor: React.FC<EditEditorProps> = ({
    info, current_component, removeComponent
}) => {
    const randValue = Math.floor(Math.random() * 100).toString();
    let html: React.ReactNode = null

    if (info.name === 'main_frame') {
        html = <div onClick={() => info.setCurrentComponent(info)} className='hover:border-[2px] hover:border-indigo-500 shadow-md' style={{
            width: info.width + 'px',
            height: info.height + 'px',
            background: info.color,
            zIndex: info.z_index
        }}>
            {
                info.image && (
                    <>
                        <Image
                            src={info.image}
                            alt={info.image}
                            layout='fill'
                            objectFit='contain'
                        />
                    </>
                )
            }
        </div>
    }

    if (info.name === 'shape' && info.type === 'rect') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)}
            style={{
                width: info.width + 'px',
                height: info.height + 'px',
                background: info.color,
                opacity: info.opacity,
                left: info.left + 'px',
                top: info.top + 'px',
                zIndex: info.z_index,
                transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
            }}
            className={`absolute cursor-move group hover:border-[2px] hover:border-indigo-500`}
        >
            <Element id={randValue} info={info} exId="" />
            {
                current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className='x-3 py-2 absolute top-[100%] left-[46%] -bottom-[20px] hidden group-hover:block cursor-pointer rounded-md'
                    >
                        <RxCross2 className='w-7 h-7 text-red-500' />
                    </div>
                )
            }
        </div>
    }

    if (info.name === 'shape' && info.type === 'circle') {
        html = <div
            id={randValue}
            onClick={() => info.setCurrentComponent(info)}
            style={{
                left: info.left + 'px',
                top: info.top + 'px',
                zIndex: info.z_index,
                transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
            }}
            className='absolute group cursor-move hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}c`} />
            <div id={`${randValue}c`} className='rounded-full' style={{
                width: info.width + 'px',
                height: info.width + 'px',
                background: info.color,
                opacity: info.opacity,
            }}>

            </div>
            {
                current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className='x-3 py-2 absolute top-[100%] left-[46%] -bottom-[20px] hidden group-hover:block cursor-pointer rounded-md'
                    >
                        <RxCross2 className='w-7 h-7 text-red-500' />
                    </div>
                )
            }
        </div>
    }

    if (info.name === 'shape' && info.type === 'trangle') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{
            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)'
        }}
            className='absolute cursor-move group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}t`} />
            <div id={`${randValue}t`} style={{
                width: info.width + 'px',
                height: info.height + 'px',
                background: info.color,
                opacity: info.opacity,
                clipPath: 'polygon(50% 0,100% 100%,0 100%)'
            }}>

            </div>
            {
                current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className='x-3 py-2 absolute top-[100%] left-[46%] -bottom-[20px] hidden group-hover:block cursor-pointer rounded-md'
                    >
                        <RxCross2 className='w-7 h-7 text-red-500' />
                    </div>
                )
            }
        </div>
    }

    if (info.name === 'text') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{
            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            padding: info.padding + 'px',
            color: info.color,
            opacity: info.opacity,
        }}
            className='absolute cursor-move group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId="" />

            <textarea
                style={{ fontSize: info.font + 'px', fontWeight: info.weight }}
                className='w-full h-full bg-transparent border-none focus:border-2 hover:border-2'
            >
                {info.title}
            </textarea>
            {
                current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className='x-3 py-2 absolute top-[100%] left-[46%] -bottom-[20px] hidden group-hover:block cursor-pointer rounded-md'
                    >
                        <RxCross2 className='w-7 h-7 text-red-500' />
                    </div>
                )
            }
        </div>
    }

    if (info.name === 'image') {
        html = <div id={randValue} onClick={() => info.setCurrentComponent(info)} style={{
            left: info.left + 'px',
            top: info.top + 'px',
            zIndex: info.z_index,
            transform: info.rotate ? `rotate(${info.rotate}deg)` : 'rotate(0deg)',
            opacity: info.opacity,
        }}
            className='absolute cursor-move group hover:border-[2px] hover:border-indigo-500'
        >
            <Element id={randValue} info={info} exId={`${randValue}img`} />
            {
                info.image && (
                    <div className='overflow-hidden' id={`${randValue}img`} style={{
                        width: info.width + 'px',
                        height: info.height + 'px'
                    }}>
                        <Image
                            src={info.image}
                            alt={info.image || "image"}
                            layout='fill'
                            objectFit='contain'
                            className={`w-full h-full`}
                            style={{
                                borderRadius: `${info.radius}%`
                            }}
                        />
                    </div>
                )
            }
            {
                current_component.id === info.id && (
                    <div
                        onClick={() => removeComponent(info.id)}
                        className='x-3 py-2 absolute top-[100%] left-[46%] -bottom-[20px] hidden group-hover:block cursor-pointer rounded-md'
                    >
                        <RxCross2 className='w-7 h-7 text-red-500' />
                    </div>
                )
            }
        </div>
    }

    return html;
}

export default EditEditor