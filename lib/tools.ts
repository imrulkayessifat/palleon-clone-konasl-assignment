import { CiText } from "react-icons/ci";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaShapes } from "react-icons/fa";
import { MdWallpaper,MdDraw } from "react-icons/md";
import { IconType } from "react-icons";

interface ToolsProps {
    component: IconType,
    type: string;
}

export const tools: ToolsProps[] = [
    {
        component: CiText,
        type: 'text'
    },
    {
        component: FaCloudUploadAlt,
        type: 'upload'
    },
    {
        component: FaShapes,
        type: 'shapes'
    },
    {
        component: MdWallpaper,
        type: 'banner'
    },
    {
        component: MdDraw,
        type: 'draw'
    }
]