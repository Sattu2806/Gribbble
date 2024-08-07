import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {}

const ShotSkeleton = (props: Props) => {
    const skeletonArray = Array.from({length:10})
  return (
    <div className='pt-10'>
        <div className='grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {skeletonArray.map((_,index) => (
                <Skeleton key={index} className='rounded-lg w-full h-[200px]'/>
            ))}
        </div>
    </div>
  )
}

export default ShotSkeleton