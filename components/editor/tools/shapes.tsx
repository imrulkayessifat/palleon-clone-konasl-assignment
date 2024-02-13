import { ComponentProps } from "@/types/type";

interface ShapesProps {
  setCurrentComponent: (component: ComponentProps) => void;
  components:ComponentProps[],
  setComponents: (components: ComponentProps[]) => void;
  data: string;
  rotate: number;
  moveElement: (id:string, currentInfo:ComponentProps) => void
  resizeElement: (id:string, currentInfo:ComponentProps) => void
  rotateElement: (id:string, currentInfo:ComponentProps) => void
}

const Shapes: React.FC<ShapesProps> = ({
  setCurrentComponent,
  components,
  setComponents,
  rotate,
  moveElement,
  resizeElement,
  rotateElement
}) => {

  const createShape = (name: string, type: string) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: '1',
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: '#3c3c3d',
      setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement
    }
    setComponents([...components, style])
  }
  return (
    <div className="grid grid-cols-1 gap-2">
      <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
      <div onClick={() => createShape('shape', 'circle')} className='flex items-center justify-center'>
        <div className='h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'>

        </div>
      </div>
      <div onClick={() => createShape('shape', 'trangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
    </div>
  )
}

export default Shapes