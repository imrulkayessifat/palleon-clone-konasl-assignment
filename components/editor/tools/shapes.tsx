import React from 'react'

const Shapes = () => {
  const createShape = (name: string, type: string) => {
    console.log(name,type)
  }
  return (
    <div className="grid grid-cols-1 gap-2">
      <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
      <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'></div>
      <div onClick={() => createShape('shape', 'trangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
    </div>
  )
}

export default Shapes