import Image from 'next/image';

import { ComponentProps } from '@/types/type';

interface EditEditorProps {
    info: ComponentProps;
    current_component: ComponentProps;
    removeComponent: (id: number) => void
}

const EditEditor: React.FC<EditEditorProps> = ({
    info, current_component, removeComponent
}) => {
    const randValue = Math.floor(Math.random() * 100)
    let html: React.ReactNode = null

    if (info.name === 'main_frame') {
        html = <div onClick={() => info.setCurrentComponent(info)} className='hover:border-[2px] hover:border-indigo-500 shadow-md' style={{
            width: info.width + 'px',
            height: info.height + 'px',
            background: info.color,
            zIndex: info.z_index
        }}>
            {
                info.image && (
                    <>
                        <Image
                            src={info.image}
                            alt={info.image}
                            layout='fill'
                            objectFit='contain'
                        />
                    </>
                )
            }
        </div>
    }
    return html;
}

export default EditEditor