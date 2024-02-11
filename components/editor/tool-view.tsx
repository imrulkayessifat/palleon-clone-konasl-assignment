import { MdKeyboardArrowLeft } from 'react-icons/md'

import Text from '@/components/editor/tools/text'
import Upload from '@/components/editor/tools/upload'
import Shapes from '@/components/editor/tools/shapes'
import Banner from '@/components/editor/tools/banner'
import { useToolStore } from '@/hooks/tools'

const views: { [key: string]: React.ElementType } = {
    text: Text,
    upload: Upload,
    shapes: Shapes,
    banner: Banner
}

interface ToolViewProps {
    data: string
}

const ToolView = ({ data }: ToolViewProps) => {
    const { state, setElements } = useToolStore()
    const CurrentView = views[data];

    return (
        <div className='h-screen relative w-[240px]'>
            <div onClick={() => setElements(false)} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-14 text-slate-300 top-[10%] cursor-pointer h-[100px] rounded-full'>
                <MdKeyboardArrowLeft />
            </div>
            <CurrentView />
        </div>
    )
}

export default ToolView