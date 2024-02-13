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
        exId ? <div onMouseDown={() => info.resizeElement && info.resizeElement(exId, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] '></div>

          : <div onMouseDown={() => info.resizeElement && info.resizeElement(id, info)} className='hidden absolute group-hover:block -bottom-[3px] -right-[3px] w-[10px] h-[10px] cursor-nwse-resize bg-white rounded-full z-[99999] '></div>
      }
      <div onMouseDown={() => info.rotateElement && info.rotateElement(id, info)} className='hidden absolute group-hover:block -top-[3px] -left-[3px] w-[10px] h-[10px] cursor-pointer bg-white rounded-full z-[99999] '></div>
    </>
  )
}

export default Element


