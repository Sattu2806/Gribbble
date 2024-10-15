'use client'
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import OtherFilter from './OtherFilter'
import { useQuery } from '@tanstack/react-query'
import { getAllCategories } from '@/actions/category'
import { Skeleton } from '@/components/ui/skeleton'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Props = {}

const BottomBar = (props: Props) => {
    const [isRotated, setIsRoated] = useState<boolean>(false)
    const [showFilter, setshowFilter] = useState<boolean>(false)
    const [otherFilter, setotherFilter] = useState<boolean>(false)
    const [activeItem, setActiveItem] = useState<string>('Following')
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/following') {
            setActiveItem('Following')
        }
        if(pathname === '/upload-new'){
            setActiveItem('New & NoteWorthy')
        }
    },[pathname])
    const searchParams = useSearchParams()
    const categoryId = searchParams.get('category')

    console.log("pathname",pathname)

    const handleFilter = () => {
        setIsRoated(!isRotated)
        setshowFilter(!showFilter)
    }

    const {data: categories, isLoading, error} = useQuery({queryKey:['cat-bot'], queryFn: async() => {
        const categories = await getAllCategories()
        return categories
    },staleTime: 1000 * 60 * 30})

    const skeletonArray = Array.from({length:10})
  return (
    <div className='mx-auto pt-7 lg:px-9 md:px-5 sm:px-6 px-6'>
        <div className='flex items-center justify-between relative'>
            <div className='text-xs mr-20 max-sm:mr-10'>
                <div className='active-item relative'>
                    <div onClick={handleFilter} className='flex items-center justify-between border-[1px] p-2 rounded-lg cursor-pointer'>
                        <span className='pr-5'>{activeItem}</span>
                        <motion.svg initial={{rotate:180}} animate={{ rotate: isRotated ? 0 : 180 }} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" role="img" className="text-neutral-500 w-[10px]">
                            <path d="M21.5265 8.77171C22.1578 8.13764 22.1578 7.10962 21.5265 6.47555C20.8951 5.84148 19.8714 5.84148 19.24 6.47555L11.9999 13.7465L4.75996 6.47573C4.12858 5.84166 3.10492 5.84166 2.47354 6.47573C1.84215 7.10979 1.84215 8.13782 2.47354 8.77188L10.8332 17.1671C10.8408 17.1751 10.8486 17.183 10.8565 17.1909C11.0636 17.399 11.313 17.5388 11.577 17.6103C11.5834 17.6121 11.5899 17.6138 11.5964 17.6154C12.132 17.7536 12.7242 17.6122 13.1435 17.1911C13.1539 17.1807 13.1641 17.1702 13.1742 17.1596L21.5265 8.77171Z"></path>
                        </motion.svg>
                    </div>
                    <div className={`${showFilter ? "block":"hidden"} absolute w-48 bg-white z-50 rounded-lg`}>
                        <ul className='bg-white shadow-md py-2 rounded-lg text-neutral-500'>
                                <li 
                                onClick={() =>  setActiveItem('Following')}
                                className={`hover:bg-neutral-300 `}
                                >
                                    <a href="/following" className='block p-2'>
                                    Following
                                    </a>
                                </li>
                                <li 
                                onClick={() =>  setActiveItem('New & NoteWorthy')}
                                className={`hover:bg-neutral-300 `}
                                >
                                    <a href="/upload-new" className='block p-2'>
                                    New & NoteWorthy
                                    </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <div className='filter-categories overflow-x-auto'>
                <ul className='flex flex-row items-center text-neutral-800 justify-between font-medium whitespace-nowrap scroll-m-0 space-x-4 text-xs max-md:hidden'>
                    {isLoading ? (
                        skeletonArray.map((skel,index) => (
                            <Skeleton key={index} className='w-[70px] h-[20px]'/>
                        ))
                    ):(
                        categories?.map((category,index) => (
                            <li key={index} className={` ${categoryId === category.value ? "bg-neutral-100":""} p-2 hover:text-neutral-800 rounded-full`}>
                                <Link href={`?category=${category.value}`}>{category.label}</Link>
                            </li>
                        ))
                    )}
                </ul>
            </div>
            <div className='ml-20 max-sm:ml-10'>
                <div onClick={() => setotherFilter(!otherFilter)} className='flex items-center p-1 px-2 border-[1px] rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" role="img" className="text-neutral-500 w-[10px]">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"></path>
                    </svg>
                    <span className='px-2 text-xs'>Filters</span>
                </div>
            </div>
        </div>
        <div className='filter-categories overflow-x-auto mt-3 md:hidden'>
                    <ul className='flex flex-row items-center text-neutral-800 justify-between font-medium whitespace-nowrap scroll-m-0 space-x-4 text-xs'>
                    {isLoading ? (
                        skeletonArray.map((skel,index) => (
                            <Skeleton key={index} className='w-[70px] h-[20px]'/>
                        ))
                    ):(
                        categories?.map((category,index) => (
                            <li key={index} className={` ${categoryId === category.value ? "bg-neutral-100":""} p-2 hover:text-neutral-800 rounded-full`}>
                                <Link href={`?category=${category.value}`}>{category.label}</Link>
                            </li>
                        ))
                    )}
                    </ul>
        </div>
        <div className={`${otherFilter ? "blcok":"hidden"}`}>
            <OtherFilter/>
        </div>
    </div>
  )
}

export default BottomBar