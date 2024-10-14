'use client'
import { getShotsByUSer } from '@/actions/shot'
import EachShot from '@/app/(Show)/_components/EachShot'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

type Props = {}

const UserShots = (props: Props) => {
    const {data:ShotData} = useQuery({
        queryKey: ['profile-shot'],
        queryFn:async() => {
            const shots = await getShotsByUSer()
            return shots
        }
    })
  return (
    <div className='pt-10 max-w-screen-xl mx-auto'>
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10'>
            {ShotData?.map((shot) => (
                <EachShot shot={shot} key={shot.id}/>
            ))}
        </div>
    </div>
  )
}

export default UserShots