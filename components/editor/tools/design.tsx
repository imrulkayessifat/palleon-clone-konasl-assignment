import Image from "next/image"

import { designTools } from "@/lib/design-tools"

const Design = () => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {
        designTools.map((design, key) => (
          <div key={key} className="w-[240px] h-[60px] relative cursor-pointer">
            <Image
              src={design.path}
              alt={design.alt}
              layout='fill'
              objectFit='contain'
              className="rounded-md overflow-hidden hover:border-[1px]"
            />
          </div>
        ))
      }
    </div>
  )
}

export default Design