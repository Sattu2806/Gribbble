import { isFollowing, toggleFollowUser } from '@/actions/following'
import { Items, Upload, User } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Bookmark, Heart, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSelectedShotStore } from '@/hooks/show/use-selected-shot-Id'

interface ShotDataType extends Upload {
    items:Items[]
    user:User
}

type Props = {
    shotData:ShotDataType | undefined
}

const Heading = ({shotData}: Props) => {
    const session = useSession()
    const {onCloseShot} = useSelectedShotStore()
    const router = useRouter()
    const FollowMutation = useMutation({
        mutationKey: ['follow-toggle'],
        mutationFn: async () => {
            if(shotData?.user.id)
            return await toggleFollowUser(shotData?.user.id)
        }
    })

    const FollowToggle = () => {
        if(!session.data) {
            router.push('/login')
            onCloseShot()
        }
        FollowMutation.mutate()
    }

    const {data:isFollowCheckData} = useQuery({
        queryKey:['check-follow',FollowMutation.isSuccess],
        queryFn:async() => {
            if(shotData?.user.id){
                const res = await isFollowing(shotData?.user.id)
                if(res.success) return res
            }
        }
    })

    console.log("isFollowCheckData",isFollowCheckData)


  return (
    <div className='py-2 flex items-center justify-between sticky top-0 bg-white z-40'>
        <div className='flex items-center space-x-2'>
            {shotData?.user.image ? (
                <Image src={shotData?.user.image} alt={shotData.user.name ?? ''} width={48} height={48} className='rounded-full'/>
            ):(
                <div className='w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center'>
                    <p className='uppercase text-2xl font-medium text-white'>{shotData?.user.name?.charAt(0)}</p>
                </div>
            )}
            <div className='space-y-[2px]'>
                <p className='text-sm font-medium text-neutral-800'>{shotData?.user.name}</p>
                <p onClick={FollowToggle} className={`text-xs text-neutral-500 cursor-pointer ${session.data?.user.id === shotData?.user.id ? "hidden":""} ${FollowMutation.isPending ? "pointer-events-none":""}`}>
                    {FollowMutation.isPending && (
                        <LoaderCircle className='animate-spin inline-block w-2 h-2 rounded-full text-pink-600' />
                    )}
                    {isFollowCheckData?.isFollowing ? "Following":"Follow"}
                </p>
            </div>
        </div>
        <div className='flex items-center space-x-3'>
            <button className='p-2 flex items-center justify-center rounded-full border-neutral-200 border-[1.5px]'>
                <Heart size={20} strokeWidth={2}/>
            </button>
            <button className='p-2 flex items-center justify-center rounded-full border-neutral-200 border-[1.5px]'>
                <Bookmark size={20} strokeWidth={2}/>
            </button>
            <button className='px-5 py-[10px] rounded-full bg-neutral-950 text-white text-sm'>Get in touch</button>
        </div>
    </div>
  )
}

export default Heading