import Image from "next/image"

import { bannerTools } from "@/lib/banner-tools"
import { useBannerImageStore } from "@/hooks/banner"

const Banner = () => {
  const { setImage } = useBannerImageStore()
  return (
    <div className="grid grid-cols-1 gap-2">
      {
        bannerTools.map((banner, key) => (
          <div onClick={()=>setImage(banner.path)} key={key} className="w-[195px] h-[50px] relative cursor-pointer">
            <Image
              src={banner.path}
              alt={banner.alt}
              layout='fill'
              objectFit='contain'
              className="rounded-md hover:border-[1px]"
            />
          </div>
        ))
      }
    </div>
  )
}

export default Banner