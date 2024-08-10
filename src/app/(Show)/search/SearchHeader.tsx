"use client"
import React, { useState, KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import {X} from "lucide-react"

type Props = {}

const SearchHeader = ({params}:{params:{searchString:string}}) => {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState<string>(decodeURIComponent(params.searchString))

    const handleSearch = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            if(searchQuery.trim()){
                router.push(`/search/${encodeURIComponent(searchQuery.trim())}`)
            }
        }
    }
  return (
    <div className='mt-10'>
        <div className='my-5'>
            <div className='bg-gradient-to-tl from-pink-200 to-sky-400 h-20 relative'>
                <div className='md:w-1/3 mx-auto h-15 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex items-center justify-between space-x-5 bg-white shadow-xl rounded-md h-16 pr-2'>
                        <div className='flex items-center justify-between w-full h-16 relative'>
                            <input 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className='w-full h-full rounded-md bg-transparent focus:outline-none px-4'
                            type="text" 
                            />
                            <X onClick={() => setSearchQuery('')} className='text-neutral-50 rounded-full bg-neutral-100 absolute right-2' size={20}/>
                        </div>
                        <div className='h-10 w-[1px] bg-neutral-500'/>
                        <div>
                            <p className='text-neutral-500'>shots</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='my-5 mt-10'>
            <h1 className='text-center font-semibold text-4xl leading-10'>{params.searchString}</h1>
            <p className='text-center text-neutral-700 py-3'>Inspirational {params.searchString} designs</p>
        </div>
    </div>
  )
}

export default SearchHeader