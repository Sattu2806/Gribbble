'use client'
import { toggleLikeShot } from '@/actions/like'
import { getAllLikedShotsByUser, getLikeCount } from '@/actions/shot'
import { ShotDataType } from '@/app/following/FollowPage'
import { GalleryData } from '@/app/uploads/_components/MediaComponents/GalleryComponent'
import { useLikeProfilestore } from '@/hooks/profile/useLike'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {}

const LikedShot = (props: Props) => {
    const {likeProfile} = useLikeProfilestore()
    
    const {data:LikedShotData} = useQuery({
        queryKey:['likedshot-profile',likeProfile],
        queryFn: async () => {
            const shot = await getAllLikedShotsByUser()
            return shot
        }
    })


      
  return (
    <div className='pt-10 max-w-screen-xl mx-auto'>
        <div className='grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {LikedShotData?.map((shot) => (
                <EachLikedShot shot={shot} key={shot.id}/>
            ))}
        </div>
    </div>
  )
}

export default LikedShot


const EachLikedShot = ({shot}:{shot:ShotDataType}) => {
    const [showTitle, setShowTitle] = useState<boolean>(false)
    const handleFirstItem = (shot:ShotDataType) => {
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

    const FirstItem = handleFirstItem(shot as ShotDataType)

    return(
        <div className='w-full h-full cursor-pointer relative'
        onMouseEnter={() => setShowTitle(true)} 
        onMouseLeave={() => setShowTitle(false)}
    >
        {FirstItem && FirstItem.content && FirstItem.type === 'image' && (
        <Image src={FirstItem.content} alt={FirstItem.content} width={400} height={400} className='rounded-lg w-full h-[200px]' />
        )}
        {FirstItem && FirstItem.content && FirstItem.type === 'video' && (
        <video src={FirstItem.content} autoPlay muted loop className='rounded-lg w-full h-[200px] object-cover' />
        )}
        <div className='pt-2 flex items-center justify-between w-full'>
            <div className='flex items-center space-x-1 relative w-full'>
                <div className='flex items-center space-x-1 relative w-full'>
                    {shot.user.image ? (
                    <Image src={shot.user.image} className='rounded-full object-cover' width={20} height={20} alt='Author' />
                    ):(
                    <p className='text-xs w-5 h-5 flex items-center justify-center bg-orange-500 text-white rounded-full'>{shot.user.name?.charAt(0)}</p>
                    )}
                    <p className='text-xs font-medium'>{shot.user.name}</p>
                </div>
                <ShowNoLikes shotId={shot.id}/>
            </div>
            <div className={`absolute bottom-7 text-sm w-full bg-gradient-to-t from-neutral-600 to-transparent rounded-lg ${showTitle ? "" :"opacity-0"} transition-all duration-200 ease-in`}>
                <div className='flex items-center justify-between w-full p-3 py-5 pt-10'>
                     <p className='text-white font-medium'>{shot.title}</p>
                </div>
            </div>
        </div>
    </div>
    )
}


const ShowNoLikes = ({shotId}:{shotId:string}) => {
    const session = useSession()
    const router = useRouter()
    const {setLikeProfile,likeProfile} = useLikeProfilestore()
    const { data } = useQuery({
        queryKey:['No-likes',shotId],
        queryFn: async () => {
            const Number = await getLikeCount(shotId)
            return Number
        }
    })

    const LikedMutation = useMutation({
        mutationKey: ['like-toggle-profile'],
        mutationFn: async () => {
            return await toggleLikeShot(shotId)
        }
    })
    const LikeToggle = () => {
        if(!session.data?.user) {
            router.push('/login')
            setLikeProfile(!likeProfile)
        }
        LikedMutation.mutate()
    }
    return(
        <div className='text-xs flex items-center space-x-1 text-neutral-500'>
        <div className='flex items-center space-x-1'>
        <span onClick={LikeToggle}>
            <Heart fill='#FFC0CB' strokeWidth={0}/>
        </span>
        <span>{data ?? 0}</span>
        </div>
    </div>
    )
}