import { Search } from 'lucide-react'
import React, { useState, KeyboardEvent } from 'react'
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

type Props = {}

const OtherFilter = (props: Props) => {
    const [querytag, setQueryTag] = useState<string>('')
    const router = useRouter()
    const pathname = usePathname()

    const handleSearch = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            event.preventDefault()
            if(querytag.trim()){
                router.push(`${pathname}/?tags=${querytag}`)
            } else {
                router.push(`${pathname}`)
            }
        }
    }
  return (
    <div className='mt-5'>
        <form action="" className='flex items-center justify-between md:space-x-7 max-md:grid max-md:grid-cols-1 max-md:w-11/12 mx-auto max-md:gap-5'>
            <input type="hidden" />
            <fieldset className='relative w-full'>
                <label className='font-semibold text-sm' htmlFor="">tags</label>
                <div className={`bg-neutral-100 mt-1 rounded-md hover:ring-2 hover:ring-[#EA4C89] hover:ring-opacity-50 cursor-pointer`}>
                    <div className='flex flex-row items-start justify-between p-[10px]'>
                        <Search className='text-neutral-500 font-bold' size={20}/>
                        <input 
                        type="search"
                        value={querytag}
                        onKeyDown={handleSearch}
                        onChange={(e) => setQueryTag(e.target.value)}
                        className='focus:outline-none pl-3 bg-transparent placeholder:text-sm text-sm w-full placeholder:text-neutral-400'
                        placeholder='Search'
                        autoComplete='off'
                         />
                    </div>
                </div>
            </fieldset>
            <fieldset className="relative w-full">
                    <a href="" className="absolute right-0 text-sm top-[6px] text-red-500 hidden">Clear</a>
                    <label htmlFor="" className="font-medium text-[14px]">Color</label>
                    <div className={` bg-neutral-100 mt-1 rounded-md hover:outline-none hover:ring-2 hover:ring-[#EA4C89] hover:ring-opacity-50 cursor-pointer `}>
                        <div className="flex flex-row items-start justify-between p-[10px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none" role="img" className="icon ">
                                <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                                <circle cx="10" cy="10.5" r="10" fill="#C4C4C4"></circle>
                                </mask>
                                <g mask="url(#mask0)">
                                <rect x="10" y="0.5" width="10" height="20" fill="#3A8BBB"></rect>
                                <path d="M20 4.5L10 -2.5V10.5L20 4.5Z" fill="#00B6E3"></path>
                                <path d="M20 16.5L10 24.5V10.5L20 16.5Z" fill="#C142A0"></path>
                                <path d="M0 0.5H10V10.5L0 16.5V0.5Z" fill="#FCC870"></path>
                                <path d="M-7 0.5H10V10.5L-7 0.5Z" fill="#EF875B"></path>
                                <path d="M0 16.5L10 24.5V10.5L0 16.5Z" fill="#FF5555"></path>
                                </g>
                                <circle cx="10" cy="10.5" r="3" fill="#F5F6F7"></circle>
                                </svg>
                            <input type="search" name="search" autoComplete="off" id=""  placeholder="Enter hex value"
                            className="focus:outline-none pl-3 bg-transparent placeholder:text-[14px] text-sm w-full  placeholder:text-neutral-400"
                            />
                        </div>
                    </div>
                </fieldset>
        </form>
    </div>
  )
}

export default OtherFilter