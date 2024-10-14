import React from 'react'
import { auth } from '@/auth'

type Props = {}

const ProfileInfo = async (props: Props) => {
    const session = await auth()
  return (
    <div className='flex items-center justify-center my-20'>
        <div className='max-w-screen-sm mx-auto'>
            <div className='flex items-center space-x-4'>
                <div className='w-[100px] h-[100px] flex items-center justify-center text-white rounded-full bg-orange-600 relative'>
                    <h1 className='text-6xl'>{session?.user.name?.charAt(0)}</h1>
                </div>
                <div>
                    <p className='text-3xl font-semibold'>{session?.user.name}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfo