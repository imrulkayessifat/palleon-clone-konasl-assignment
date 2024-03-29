import { MdKeyboardArrowLeft } from 'react-icons/md'

import { ComponentProps } from '@/types/type'

import Text from '@/components/editor/tools/text'
import Upload from '@/components/editor/tools/upload'
import Draw from '@/components/editor/tools/draw'
import Shapes from '@/components/editor/tools/shapes'
import Banner from '@/components/editor/tools/banner'
import { useToolStore } from '@/hooks/tools'

const views: { [key: string]: React.ElementType } = {
    text: Text,
    upload: Upload,
    shapes: Shapes,
    banner: Banner,
    draw:Draw
}

interface ToolViewProps {
    data: string,
    setCurrentComponent: (component: ComponentProps) => void;
    components: ComponentProps[],
    setComponents: (components: ComponentProps[]) => void;
    rotate: number;
    moveElement: (id: string, currentInfo: ComponentProps) => void
    resizeElement: (id: string, currentInfo: ComponentProps) => void
    rotateElement: (id: string, currentInfo: ComponentProps) => void
    setFont: (data: number) => void
    setWeight: (data: number) => void
}

const ToolView = ({
    data,
    setCurrentComponent,
    components,
    setComponents,
    rotate,
    moveElement,
    resizeElement,
    rotateElement,
    setFont,
    setWeight
}: ToolViewProps) => {
    const { state, setElements } = useToolStore()
    const CurrentView = views[data];

    return (
        <div className='h-screen relative w-[240px]'>
            <div onClick={() => setElements(false)} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-14 text-slate-300 top-[10%] cursor-pointer h-[100px] rounded-full'>
                <MdKeyboardArrowLeft />
            </div>
            <CurrentView
                setCurrentComponent={setCurrentComponent}
                components={components}
                setComponents={setComponents}
                rotate={rotate}
                moveElement={moveElement}
                resizeElement={resizeElement}
                rotateElement={rotateElement}
                setFont={setFont}
                setWeight={setWeight}
            />
        </div>
    )
}

export default ToolView