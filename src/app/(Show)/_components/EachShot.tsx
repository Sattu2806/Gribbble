import React, { useState } from 'react'
import { ShotDataType } from './RenderShots'
import Image from 'next/image'
import { Items } from '@prisma/client'
import { GalleryData } from '@/app/uploads/_components/MediaComponents/GalleryComponent'
import { Bookmark, Heart } from 'lucide-react'
import { useSelectedShotStore } from '@/hooks/show/use-selected-shot-Id'

type Props = {
    shot: ShotDataType
}

const EachShot = ({shot}: Props) => {
    const [showtitle, setShowTitle] = useState<boolean>(false)
    const {setSelectedShotId,onOpenShot} = useSelectedShotStore()

    function updateLink () {
      window.history.pushState(null,'',`shot/${shot.id}`)
    }

    const handleFirstItem = () => {
      const firstItem = shot.items[0]

      if(firstItem.type === 'image'){
        return {type:'image',content:firstItem.content}
      } else if (firstItem.type === 'video'){
        return {type:'video',content:firstItem.content}
      } else if (firstItem.type === 'gallery'){
        try {
          const parsedContent : GalleryData[] = JSON.parse(firstItem.content)
          if(Array.isArray(parsedContent)){
            const imageOrvideo = parsedContent.find((media) => media.type === 'video' || media.type === 'image' )

            return {
              type:imageOrvideo?.type,
              content:imageOrvideo?.url
            }
          }
        } catch (error) {
          console.error("Failed to pared the gallery component")
        }
      } else {
        return null
      }
    }
    
    const FirstItem = handleFirstItem()

  return (
    <div onClick={() => {onOpenShot();setSelectedShotId(shot.id);updateLink()}} className='w-full h-full cursor-pointer relative' onMouseEnter={() => setShowTitle(true)} onMouseLeave={() => setShowTitle(false)}>
        {/* <Image src={shot.items[0].content} alt={shot.items[0].extra1} width={400} height={400} className='rounded-lg w-full h-[200px]' /> */}
        {FirstItem && FirstItem.content && FirstItem.type === 'image' && (
          <Image src={FirstItem.content} alt={FirstItem.content} width={400} height={400} className='rounded-lg w-full h-[200px]' />
        )}
        {FirstItem && FirstItem.content && FirstItem.type === 'video' && (
          <video src={FirstItem.content} autoPlay muted loop className='rounded-lg w-full h-[200px] object-cover' />
        )}
        <div className='pt-2 flex items-center justify-between w-full'>
          <div className='flex items-center space-x-1 relative w-full'>
            {shot.user?.image && shot.user.image ? (
              <Image src={shot.user.image} className='rounded-full object-cover' width={20} height={20} alt='Author' />
            ):(
              <p className='text-xs w-5 h-5 flex items-center justify-center bg-orange-500 text-white rounded-full'>{shot.user?.name?.charAt(0)}</p>
            )}
            <p className='text-xs font-medium'>{shot.user?.name}</p>
          </div>
          <div className='flex items-center space-x-1 text-neutral-500'>
              <div className='flex items-center space-x-1'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" role="img" className="icon fill-current shot-tools-icon">
                  <path d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </span>
                <span className='text-xs'>55</span>
              </div>
              <div className='flex items-center space-x-1'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" role="img" className="icon fill-current shot-tools-icon">
                    <path d="M8 3C4.36992 3 1.98789 6.21774 1.18763 7.49059C1.09079 7.64462 1.04237 7.72163 1.01527 7.84042C0.99491 7.92964 0.99491 8.07036 1.01527 8.15958C1.04237 8.27837 1.09079 8.35539 1.18763 8.50941C1.98789 9.78226 4.36992 13 8 13C11.6301 13 14.0121 9.78226 14.8124 8.50941L14.8124 8.50939C14.9092 8.35538 14.9576 8.27837 14.9847 8.15958C15.0051 8.07036 15.0051 7.92964 14.9847 7.84042C14.9576 7.72163 14.9092 7.64462 14.8124 7.4906L14.8124 7.49059C14.0121 6.21774 11.6301 3 8 3Z" fill="currentColor"></path>
                    <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" fill="white"></path>
                    </svg>
                </span>
                <span className='text-xs'>7.9k</span>
              </div>
          </div>
          <div className={`absolute bottom-7 text-sm w-full bg-gradient-to-t from-neutral-600 to-transparent ${showtitle ? "" : "opacity-0"} transition-all duration-200 ease-in rounded-b-lg`}>
              <div className='flex items-center justify-between w-full p-3 py-5 pt-10'>
                <p className='text-white font-medium'>{shot.title}</p>
                <div className='flex items-center space-x-2'>
                  <span className='p-2 rounded-full bg-white inline-block'>
                    <Bookmark size={13} strokeWidth={2}/>
                  </span>
                  <span className='p-2 rounded-full bg-white inline-block'>
                    <Heart size={13} strokeWidth={2}/>
                  </span>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default EachShot