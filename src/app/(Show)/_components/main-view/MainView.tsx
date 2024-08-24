'use client'
import { useSelectedShotStore } from '@/hooks/show/use-selected-shot-Id'
import { X } from 'lucide-react'
import React from 'react'
import {motion, AnimatePresence} from "framer-motion"
import { useQuery } from '@tanstack/react-query'
import { getShotById } from '@/actions/shot'
import MainViewSkeleton from './MainViewSkeleton'
import Heading from './Heading'
import MainContent from './MainContent'

type Props = {}

const MainView = (props: Props) => {
    const {isShotOpen, onCloseShot, selectedShotId} = useSelectedShotStore()

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
                        <div className={`max-w-screen-lg w-2/3 transition-all duration-150 ease-in relative mx-auto`}>
                            <div>
                                <div className='relative md:py-16 py-6'>
                                    <h1 className='text-2xl font-semibold'>{ShotData?.title}</h1>
                                    <Heading shotData={ShotData} />
                                    <MainContent shotData={ShotData}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
        )}
    </AnimatePresence>
  )
}

export default MainView