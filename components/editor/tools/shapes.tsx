import { ComponentProps } from "@/types/type";

interface ShapesProps {
  setCurrentComponent: (component: ComponentProps) => void;
  components: ComponentProps[],
  setComponents: (components: ComponentProps[]) => void;
  data: string;
  rotate: number;
  moveElement: (id: string, currentInfo: ComponentProps) => void
  resizeElement: (id: string, currentInfo: ComponentProps) => void
  rotateElement: (id: string, currentInfo: ComponentProps) => void
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

  type ShapeType = 'rect' | 'square' | 'circle' | 'triangle' | 'ellipse' | 'default';

  const dimensions: Record<ShapeType, { width: number, height: number,borderRadius?:string }> = {
    'rect': { width: 120, height: 90 },
    'square': { width: 120, height: 120 },
    'circle': { width: 90, height: 90 },
    'ellipse': { width: 90, height: 45,borderRadius:'50%' },
    'triangle': { width: 50, height: 50 },
    'default': { width: 200, height: 150 }
  };


  const createShape = (name: string, type: ShapeType) => {
    const { width, height } = dimensions[type] || dimensions['default'];

    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: '1',
      width,
      height,
      rotate,
      z_index: 2,
      color: '#2196F3',
      setCurrentComponent: (a: ComponentProps) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement
    }
    setComponents([...components, style])
  }
  return (
    <div className="grid grid-cols-1 gap-2">
      <div onClick={() => createShape('shape', 'rect')} className='h-[120px] w-[90px] bg-blue-500 cursor-pointer'></div>
      <div onClick={() => createShape('shape', 'square')} className='h-[120px] w-[120px] bg-blue-500 cursor-pointer'></div>
      <div onClick={() => createShape('shape', 'circle')} className='flex items-center justify-center'>
        <div className='h-[90px] w-[90px] bg-blue-500 cursor-pointer rounded-full'>

        </div>
      </div>
      <div onClick={() => createShape('shape', 'ellipse')} className='flex items-center justify-center'>
        <div
          style={{
            width: 200 + 'px',
            height: 100 + 'px',
            borderRadius: '50%'
          }}
          className="bg-blue-500"
        >

        </div>
      </div>
      <div onClick={() => createShape('shape', 'triangle')} style={{ clipPath: 'polygon(50% 0,100% 100%,0 100%)' }} className='h-[50px] bg-blue-500 cursor-pointer'></div>
    </div>
  )
}

export default Shapes