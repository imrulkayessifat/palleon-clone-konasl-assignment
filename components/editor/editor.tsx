"use client";

import { useToolStore } from '@/hooks/tools'
import Tools from '@/components/editor/tools'
import ToolView from '@/components/editor/tool-view';

const Editor = () => {
    const { state,name } = useToolStore()
    return (
        <div className='mt-24'>
            <div className='flex mx-auto px-8'>
                <Tools />
                {
                    state && name && <ToolView data={name} />
                }
            </div>
        </div>
    )
}

export default Editor