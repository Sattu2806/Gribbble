'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const Menu = ({params}:{params:{userId:string}}) => {
    const pathname = usePathname()
    const lastpath = pathname.split('/').slice(-1)[0]
  return (
    <div className='max-w-screen-xl mx-auto'>
        <div className='border-b'>
            <ul className='flex items-center space-x-7 font-semibold text-base my-5'>
                <Link href={`/profile/${params.userId}/shots`} className={`${lastpath === params.userId || lastpath === "shots" ? 'p-1 px-2 rounded-full bg-neutral-200':''}`}>
                    Work
                </Link>
                <Link href={`/profile/${params.userId}/boosted`}  className={`${lastpath === 'boosted' ? "p-1 px-2 rounded-full bg-neutral-200" :""}`}>Boosted Shots</Link>
                <Link href={`/profile/${params.userId}/collections`}  className={`${lastpath === 'collections' ? "p-1 px-2 rounded-full bg-neutral-200" :""}`}>Collections</Link>
                <Link href={`/profile/${params.userId}/liked`}  className={`${lastpath === 'liked' ? "p-1 px-2 rounded-full bg-neutral-200" :""}`}>Liked Shots</Link>
                <Link href={`/profile/${params.userId}/about`}  className={`${lastpath === 'about' ? "p-1 px-2 rounded-full bg-neutral-200" :""}`}>About</Link>
                <Link href={`/profile/${params.userId}/drafts`}  className={`${lastpath === 'drafts' ? "p-1 px-2 rounded-full bg-neutral-200" :""}`}>Drafts</Link>
            </ul>
        </div>
    </div>
  )
}

export default Menu