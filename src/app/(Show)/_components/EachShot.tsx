import React, { useState } from 'react'
import { ShotDataType } from './RenderShots'
import Image from 'next/image'
import { Items } from '@prisma/client'

type Props = {
    shot: ShotDataType
}

const EachShot = ({shot}: Props) => {
    const [showtitle, setShowTitle] = useState<boolean>(false)


  return (
    <div className='w-full h-full cursor-pointer relative' onMouseEnter={() => setShowTitle(true)} onMouseLeave={() => setShowTitle(false)}>
        <Image src={shot.items[0].content} alt={shot.items[0].extra1} width={400} height={400} className='rounded-lg w-full h-[200px]' />
        <div className='pt-2 flex items-center justify-between w-full'>
        </div>
    </div>
  )
}

export default EachShot