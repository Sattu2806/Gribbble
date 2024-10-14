import { useCommentStore } from '@/hooks/show/use-comment'
import { Bookmark, Heart, Info, LoaderCircle, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { ShotDataType } from './Heading'
import { Comment, User } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { addComment, getAllCommentByShot } from '@/actions/comment'
import { useRouter } from 'next/navigation'
import { useSelectedShotStore } from '@/hooks/show/use-selected-shot-Id'
import Image from 'next/image'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { hasLikedShot, toggleLikeShot } from '@/actions/like'
import { isShotSavedByUser } from '@/actions/collections'
import { useCollectionStore } from '@/hooks/show/use-collection'

type Props = {
    data:ShotDataType | undefined
}

interface ExtendedComments extends Comment {
    user: User | null
}

const Comments = ({data}:Props) => {
    const {isCommentOpen} = useCommentStore()
    const session = useSession()
    const [commentInput, setCommentInput] = useState<string>()
    const {onCloseShot} = useSelectedShotStore()
    const {onOpenCollection,setUploadId,isChanged} = useCollectionStore()
    const router = useRouter()

    const CommentMutation = useMutation({
        mutationKey: ['add-comment'],
        mutationFn: async () => {
            if(commentInput && data?.id)
            return await addComment(data?.id,commentInput)
        }
    })

    const {data:AllCommentData} = useQuery({
        queryKey:['all-comments',CommentMutation.isSuccess],
        queryFn:async() => {
            if(data?.id){
                const res = await getAllCommentByShot(data.id)
                return res
            }else{
                return undefined
            }
        }
    })

    const AddComment = () => {
        if(!session.data) {
            router.push('/login')
            onCloseShot()
        }
        CommentMutation.mutate(undefined,{
            onSuccess:() => {
                setCommentInput('')
            }
        })
    }


    const LikedMutation = useMutation({
        mutationKey: ['like-toggle-comment'],
        mutationFn: async () => {
            if(data?.user.id)
            return await toggleLikeShot(data.id)
        }
    })

    const LikeToggle = () => {
        if(!session.data?.user) {
            router.push('/login')
            onCloseShot()
        }
        LikedMutation.mutate()
    }

    const { data: isLikeCheckData } = useQuery({
        queryKey: ['check-like', LikedMutation.isSuccess],
        queryFn: async () => {
            if (data?.user?.id) {
                const res = await hasLikedShot(data.id);
                return res !== undefined ? res : false; // Ensure a non-undefined value is returned
            } else {
                return false; // Explicitly return false if user ID is not available
            }
        },
        // You can also use an enabled flag to prevent the query from running when not necessary
        enabled: !!data?.user?.id
    });
    

    const { data: isShotSaved } = useQuery({
        queryKey: ['check-save',isChanged],
        queryFn: async () => {
            if(data?.id)
                return await isShotSavedByUser(data?.id)
        },
        enabled: !!data?.user?.id
    });



  return (
    <div className={`${isCommentOpen ? "w-1/4":"w-0 hidden"} mt-10 px-10 overflow-y-scroll`}>
        <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
            <button onClick={LikeToggle} className={`p-2 flex items-center justify-center rounded-full border-neutral-200 border-[1.5px] ${isLikeCheckData ? "bg-pink-200":"border-[1.5px] border-neutral-200"}`}>
                {LikedMutation.isPending ? (
                    <LoaderCircle className='animate-spin inline-block w-6 h-6 rounded-full text-pink-400' />
                ):(
                    <Heart fill={`${isLikeCheckData ? "#DE3163":"#ffffff"}`} className={`${isLikeCheckData ? "text-pink-500":"text-neutral-800"}`} size={20} strokeWidth={2}/>
                )}
            </button>
                <button onClick={() => {
                onOpenCollection()
                if(data?.id)
                        setUploadId(data?.id)
                }} className={` ${isShotSaved?.isSaved ? "bg-pink-200 text-white":"border-[1px] border-neutral-200 rounded-full"} p-2 flex items-center justify-center rounded-full`}>
                    <Bookmark fill={`${isShotSaved?.isSaved ? "#DE3163":"#fff"}`} size={20} strokeWidth={isShotSaved?.isSaved? 0:2}/>
                </button>
                    <Popover>
                    <PopoverTrigger asChild>
                        <Button className='p-2 border-[1.5px] border-neutral-200 rounded-full block' variant="outline"><Upload size={20} strokeWidth={2} className='text-neutral-800' /></Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 z-[9999] overflow-x-scroll">
                        <h1 >{process.env.NEXT_PUBLIC_URL}shot/{data?.id}</h1>
                    </PopoverContent>
                    </Popover>
            </div>
            <div>
                <button className='p-2 border-[1.5px] border-neutral-200 rounded-full block'>
                    <Info size={20} strokeWidth={2} className='text-neutral-800' />
                </button>
            </div>
        </div>
        <div className='my-5 mt-10 border-b'>
            {session.data ? (
                <div className='mb-10'>
                    <div className='border-b border-neutral-600 mt-2'>
                        <input onChange={(e) => setCommentInput(e.target.value)} className='w-full outline-none border-none placeholder:text-sm placeholder:font-light' placeholder={`Give feeback to ${data?.user.name}'s ${data?.title}`} type="text" />
                    </div>
                    <button onClick={AddComment} className={`place-items-end px-4 py-2 bg-pink-600 rounded-full text-white my-2 mt-4 text-sm flex items-center space-x-2 ${CommentMutation.isPending ? "pointer-events-none opacity-50":""}`}>
                    {CommentMutation.isPending && (
                        <LoaderCircle className='animate-spin inline-block w-3 h-3 rounded-full text-white ' />
                    )}
                    Add 
                    </button>
                </div>
            ):(
                <div className='flex flex-col items-center justify-center'>
                    <img src="/signup.png" className='w-[130px]' alt="" />
                    <h1 className='text-center font-semibold text-xl mt-2'>Join the Discussion</h1>
                    <p className='text-xs text-neutral-500 text-center my-1' >Looking to share your feedback and join in on the conversation?</p>
                    <Link href='/register' className='px-5 py-[10px] rounded-full bg-neutral-950 font-medium text-white text-sm my-4'>Sign up to Gribbble</Link>
                </div>
            )}
        </div>
        { AllCommentData?.comments && AllCommentData.success && AllCommentData.comments?.map((comment) => {
            const now  = new Date().getTime()
            const commentTime = new Date(comment.createdAt).getTime();
            const secondsAgo = Math.floor((now - commentTime) / 1000);
            let timeAgo;

            if (secondsAgo < 60) {
                timeAgo = `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`;
            } else if (secondsAgo < 3600) {
                const minutesAgo = Math.floor(secondsAgo / 60);
                timeAgo = `${minutesAgo} minute${minutesAgo !== 1 ? 's' : ''} ago`;
            } else if (secondsAgo < 86400) {
                const hoursAgo = Math.floor(secondsAgo / 3600);
                timeAgo = `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`;
            } else {
                const daysAgo = Math.floor(secondsAgo / 86400);
                timeAgo = `${daysAgo} day${daysAgo !== 1 ? 's' : ''} ago`;
            }
            return(
                <div key={comment.id} className='py-2'>
                    <div className='flex items-center space-x-2'>
                        <Image src={comment.user.image ?? '/author1.jpg'} width={32} height={32} alt={comment.user.name ?? ''} className='rounded-full' />
                        <p className='font-medium text-xs'>{comment.user.name}</p>
                    </div>
                    <p className='text-sm pl-10 font-light -mt-1'>{comment.content}</p>
                    <p className='pl-10 text-xs'>{timeAgo}</p>
                </div>
            )
        })}
    </div>
  )
}

export default Comments