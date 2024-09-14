'use client'
import { useSelectedShotStore } from '@/hooks/show/use-selected-shot-Id'
import { Info, MessageCircle, Upload, X } from 'lucide-react'
import React from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { useQuery } from '@tanstack/react-query'
import { getShotById } from '@/actions/shot'
import MainViewSkeleton from './MainViewSkeleton'
import Heading from './Heading'
import MainContent from './MainContent'
import Image from 'next/image'
import { getMoreShotByUser } from '@/actions/upload'
import Link from 'next/link'
import EachShot from '../EachShot'
import { useCommentStore } from '@/hooks/show/use-comment'
import Comments from './Comments'
import { getAllCommentByShot } from '@/actions/comment'

type Props = {}

const MainView = (props: Props) => {
    const {isShotOpen, onCloseShot, selectedShotId} = useSelectedShotStore()
    const {isCommentOpen,onOpenComment,onCloseComment} = useCommentStore()

    const {isLoading,data:ShotData} = useQuery({
        queryKey: ['shot', selectedShotId],
        queryFn:async() => {
            if(selectedShotId){
                const shot = await getShotById(selectedShotId)
                if(shot)
                    return shot
            }
        }
    })

    const {isLoading:MoreShotLoading,data:MoreShotData} = useQuery({
        queryKey: ['more-shot',ShotData],
        queryFn:async() => {
            if(selectedShotId && ShotData?.user.id){
                const shot = await getMoreShotByUser(ShotData?.user.id,ShotData.id)
                return shot
            }
            return null
        }
    })

    const {data:AllCommentData} = useQuery({
        queryKey:['number-comment',ShotData?.id],
        queryFn:async() => {
            if(ShotData?.id){
                const res = await getAllCommentByShot(ShotData.id)
                return res
            }else{
                return undefined
            }
        }
    })


  return (
    <AnimatePresence>
        {isShotOpen && (
        <motion.div
        initial={{ translateY: 1000, scale: 0.9, opacity: 0.7 }}
        animate={{ opacity: 1, translateY: 0, scale: 1 }}
        exit={{opacity:0,translateY:1000}}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed max-md:top-0 max-md:left-0 bottom-0 max-md:right-0 md:h-[97vh] md:w-full md:rounded-t-[40px] bg-white z-[100] shadow-main-view overflow-y-auto`}>
            <div onClick={onCloseShot} className='fixed top-0 right-4 cursor-pointer'>
                <X className='text-white' size={24} />
            </div>
            {isLoading ? (
                <MainViewSkeleton/>
            ):(
                <div>
                    <div className='flex items-start'>
                        <div className={`max-w-screen-lg w-3/4 transition-all duration-150 ease-in relative ${isCommentOpen ? "px-10 border-r-[1px]":"mx-auto"}`}>
                            <div>
                                <div className='relative md:py-16 py-6'>
                                    <h1 className='text-2xl font-semibold'>{ShotData?.title}</h1>
                                    <Heading shotData={ShotData} />
                                    <MainContent shotData={ShotData}/>
                                    <div>
                                        <div className='flex items-center mt-14 mb-8'>
                                            <div className='w-full h-[2px] bg-neutral-200' />
                                            <span className='mx-5'>
                                                {ShotData?.user.image ? (
                                                    <div className='w-16 h-16'>
                                                        <Image src={ShotData?.user.image} alt={ShotData?.user.image} width={64} height={64} className=' rounded-full' />
                                                    </div>
                                                ):(
                                                    <div className='w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center'>
                                                        <p className='uppercase text-4xl font-medium text-white'>{ShotData?.user.name?.charAt(0)}</p>
                                                    </div>
                                                )}
                                            </span>
                                            <div className='w-full h-[2px] bg-neutral-200' />
                                        </div>
                                        <div className='flex flex-col items-center'>
                                                <h1 className='text-2xl font-medium text-black'>{ShotData?.user.name}</h1>
                                                <p className='text-sm py-3 mb-4'>Creating stars in the digital universe ✨ ⤵</p>
                                                <button className='px-5 py-[10px] rounded-full bg-neutral-950 font-medium text-white text-sm'>Get in Touch</button>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='flex items-center justify-between mt-20 mb-3'>
                                                <h1 className='font-bold'>More by {ShotData?.user.name}</h1>
                                                <Link href='/profile'>View profile</Link>
                                        </div>
                                        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>
                                            {MoreShotData && MoreShotData.map((data,index) => (
                                                <div key={index}>
                                                    <EachShot shot={data} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={onCloseComment} className={`p-2 border-[1px] border-neutral-200 rounded-full absolute top-12 -right-4 bg-white ${isCommentOpen ? "":"hidden" }`}>
                                <X size={14} />
                            </div>
                        </div>
                        <Comments data={ShotData}/>
                    </div>
                    <div className={`absolute top-1/2 space-y-5 right-5 ${isCommentOpen ? "hidden":"block"}`}>
                        <button onClick={onOpenComment} className='p-2 border-[1.5px] border-neutral-200 rounded-full block relative'>
                            <MessageCircle size={20} strokeWidth={2} className='text-neutral-800' />
                            <div className='absolute -top-2 right-0 rounded-full w-4 h-4 text-xs bg-pink-600 text-white'>
                                {AllCommentData?.comments?.length}
                            </div>
                        </button>
                        <button  className='p-2 border-[1.5px] border-neutral-200 rounded-full block'>
                            <Upload size={20} strokeWidth={2} className='text-neutral-800' />
                        </button>
                        <button className='p-2 border-[1.5px] border-neutral-200 rounded-full block'>
                            <Info size={20} strokeWidth={2} className='text-neutral-800' />
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default MainView