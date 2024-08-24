import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

type Props = {}

const MainViewSkeleton = (props: Props) => {
  return (
    <div className='max-w-screen-lg mx-auto my-10'>
        <Skeleton className='w-64 h-5 '/>
        <div className='flex items-center justify-between'>
            <div className='my-4 flex items-center space-x-2'>
                <Skeleton className='w-14 h-14 rounded-full' />
                <div className='space-y-2'>
                    <Skeleton className='w-16 h-4'/>
                    <Skeleton className='w-10 h-2'/>
                </div>
            </div>
            <div className='flex items-center space-x-4'>
                <Skeleton className='w-12 h-12 rounded-full' />
                <Skeleton className='w-12 h-12 rounded-full' />
                <Skeleton className='w-12 h-12 rounded-full' />
            </div>
        </div>
        <div className='my-10'>
            <Skeleton className='h-[500px] rounded-xl w-4/5 mx-auto' />
        </div>
    </div>
  )
}

export default MainViewSkeleton