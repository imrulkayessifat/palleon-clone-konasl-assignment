import { useState } from "react";

import { tools } from "@/lib/tools";
import { useToolStore } from "@/hooks/tools";

const Tools = () => {
    const { setElements } = useToolStore();
    const [selectedTool, setSelectedTool] = useState<string | null>(null);
   
    return (
        <div className='flex flex-col gap-6 w-[80px] h-full overflow-y-auto'>
            {
                tools.map((data, key) => {
                    const ToolsView = data.component;
                    const isSelected = data.type === selectedTool;
                    return (
                        <div
                            key={key}
                            onClick={() => {
                                setElements(true, data.type);
                                setSelectedTool(data.type);
                            }}
                            className={`cursor-pointer`}
                        >
                            <ToolsView className={`${isSelected ? 'text-blue-500' : ''} w-5 h-5 `} />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Tools