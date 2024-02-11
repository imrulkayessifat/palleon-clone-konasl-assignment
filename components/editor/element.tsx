import { ComponentProps } from '@/types/type';
import React from 'react'

interface ElementProps {
  id: string;
  info: ComponentProps;
  exId: string;
}

const Element: React.FC<ElementProps> = ({ id, info, exId }) => {
  return (
    <>
      {
        exId ? <>
          <div onMouseDown={() => info.resizeElement && info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] '></div>
          <div onMouseDown={() => info.resizeElement && info.resizeElement(exId, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nesw-resize bg-white rounded-full z-[99999] '></div>
          <div onMouseDown={() => info.resizeElement && info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nesw-resize bg-white rounded-full z-[99999] '></div>
        </>
          : <>
            <div onMouseDown={() => info.resizeElement && info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] '></div>
            <div onMouseDown={() => info.resizeElement && info.resizeElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -right-[3px] w-[10px] h-[10px] cursor-nesw-resize bg-white rounded-full z-[99999] '></div>
            <div onMouseDown={() => info.resizeElement && info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -left-[3px] w-[10px] h-[10px] cursor-nesw-resize bg-white rounded-full z-[99999] '></div>
          </>
      }
      <div onMouseDown={() => info.rotateElement && info.rotateElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] '></div>

      <div onMouseDown={() => info.moveElement && info.moveElement(id, info)} className='hidden absolute group-hover:block -top-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-ns-resize bg-white rounded-full z-[99999] '></div>
      <div onMouseDown={() => info.moveElement && info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -left-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-ew-resize bg-white rounded-full z-[99999] '></div>
      <div onMouseDown={() => info.moveElement && info.moveElement(id, info)} className='hidden absolute group-hover:block top-[50%] -right-[3px] translate-[-0%,50%] w-[10px] h-[10px] cursor-ew-resize bg-white rounded-full z-[99999] '></div>
      <div onMouseDown={() => info.moveElement && info.moveElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] left-[50%] translate-[-50%,0%] w-[10px] h-[10px] cursor-ns-resize bg-white rounded-full z-[99999] '></div>
    </>
  )
}

export default Element