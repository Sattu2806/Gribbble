'use client'
import { useMenuStore } from '@/hooks/use-menu'
import React, { useEffect, useRef, useState } from 'react'
import useUploadDataStore from '@/hooks/use-upload-data'
import {v4 as uuidv4} from "uuid"

type Props = {}

const ImageComponent = ({entryId}: {entryId:string}) => {
    const [clickedElement, setClickedElement] = useState<boolean>(false)
    const {setSelectedEntryId, setSelectedmenu,onOpenMenu} = useMenuStore()
    const {getEntry,updateEntry} = useUploadDataStore()
    const fileInputRef = useRef<HTMLInputElement | null> (null)

    console.log("entry", entryId)
    const handleFile = (file:File) => {
        const reader = new FileReader()
        reader.onload = async () => {
            if(reader.result){
                updateEntry(entryId,reader.result as string,'','small')
            }
        }
        reader.readAsDataURL(file)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            handleFile(event.target.files[0])
        }
    }

    const handleClick = () => {
        if(fileInputRef.current){
            fileInputRef.current.click()
        }

    }
    
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
        if(event.dataTransfer.files && event.dataTransfer.files.length > 0){
            handleFile(event.dataTransfer.files[0])
        }
    }
    
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }
    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }
    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    useEffect(() => {
        const handleClickOutside = (event:MouseEvent) => {
            const divElement = document.getElementById('myDiv')
            if (divElement && !divElement.contains(event.target as Node)) {
                setClickedElement(false)
            }
        }

        document.addEventListener('mousedown',handleClickOutside)

        return () => {
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])

    const entryData = getEntry(entryId)

  return (
    <div className='flex flex-col mt-20'>
        <div id='myDiv' className={`relative hover:border-2 transition-all duration-100 ease-in mx-auto rounded-xl ${clickedElement ? "border-2 border-pink-500"  :""}`}>
            <div                             
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver} onClick={() => {setSelectedmenu('image');onOpenMenu();setSelectedEntryId(entryId);setClickedElement(true);handleClick()}} className={`flex items-center justify-center min-h-[400px] ${entryData?.extra2 === 'large' ? "max-w-screen-lg" :"max-w-screen-md"} aspect-video transition-all ease-in duration-200 ${!entryData?.content ? "bg-gray-100":"bg-white "} rounded-lg m-4`}>
                {entryData?.content ? (
                    <img src={entryData?.content} alt={entryData.extra1} className='rounded-xl max-w-full h-auto' />
                ):(
                    <label htmlFor="" className='flex flex-col items-center justify-center min-h-[400px] aspect-video'>
                        <div className='text-center'>
                            Drag and drop an {entryData?.type} , or click to Browse
                        </div>
                        <input ref={fileInputRef} type="file" onChange={handleFileChange} accept='image/*' className='hidden' />
                    </label>
                )}
            </div>
        </div>
        <div className='flex opacity-0 hover:opacity-100 transition-all duration-150 ease-in items-center mt-10'>
            <div className='line border-2 h-[1.5px] border-pink-500 w-full rounded-full'></div>
            <button onClick={() => {setSelectedEntryId(entryId);setSelectedmenu('main');onOpenMenu()}} className='p-3 rounded-full bg-pink-500 flex items-center text-white'>
                <svg
                    data-v-351edcb1=""
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    svg-inline=""
                    role="presentation"
                    focusable="false"
                    fill="currentColor"
                    tabIndex={1}
                    className="w-4"
                >
                    <path
                        data-v-351edcb1=""
                        d="M20 10h-6V4a2 2 0 00-4 0v6H4a2 2 0 000 4h6v6a2 2 0 004 0v-6h6a2 2 0 000-4z"
                    ></path>
                </svg>
            </button>
            <div className='line border-2 h-[1.5px] border-pink-500 w-full rounded-full'></div>
        </div>
    </div>
  )
}

export default ImageComponent