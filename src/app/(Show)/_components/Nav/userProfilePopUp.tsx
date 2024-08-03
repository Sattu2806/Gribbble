import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {}

const UserProfilePopUp = ({openProfileModal}:{openProfileModal:boolean}) => {
    const {data} = useSession()
  return (
    <div className={`absolute top-12 right-4 p-5 py-10 bg-white rounded-3xl z-50 text-black w-[300px] shadow-main-view-profile text-base transition-all ease-in duration-100 ${openProfileModal ? "visible opacity-100":"invisible opacity-0"}`}>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[50px] h-[50px] flex items-center justify-center text-white rounded-full bg-orange-600 relative'>
                {data?.user.image ? (
                    <Image src={data?.user.image} width={40} height={40} alt='User' className='rounded-full' />
                    ):(
                    <p className='text-2xl'>{data?.user.name?.charAt(0)}</p>
                )}
            </div>
            <h1 className='text-center font-medium text-base my-2'>{data?.user.name}</h1>
        </div>
        <div className='bg-orange-50 rounded-lg p-4'>
                <div className='flex items-center justify-between text-sm'>
                    <h1>Pro Stat</h1>
                    <h2>Last 90 days</h2>
                </div>
                <hr className='my-2' />
                <div className='h-[70px] flex items-center justify-center text-sm my-2'>
                    <button className='p-3 border-[1px] border-neutral-700 rounded-full text-white bg-neutral-800'>
                        Go Pro to Unlock
                    </button>
                </div>
                <button className='text-xs flex items-center space-x-2'>
                    View all activities <ArrowRight size={10}/>
                </button>
            </div>
            <div className='space-y-3 mt-4 text-neutral-500 p-1'>
                <Link href='/uploads/new'  className='block'>Share Work</Link>
                <Link href={`/profile/${data?.user.name}`} className='block' >Profile</Link>
                <p>Work preference</p>
                <p>Settings</p>
                <hr className='my-2' />
                <button onClick={() => signOut()} className='mt-6'>
                    SignOut
                </button>
            </div>
    </div>
  )
}

export default UserProfilePopUp