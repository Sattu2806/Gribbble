import { useMenuStore } from '@/hooks/use-menu'
import useUploadDataStore from '@/hooks/use-upload-data'
import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, Copy, Trash2,Plus } from 'lucide-react'
import {v4 as uuidv4} from "uuid"
import { UploadMedia } from '@/actions/cloudinary'

type Props = {
    entryId:string
    url:string | undefined | null
    type: 'video' | 'image'
}

const Firstmedia = ({url,type,entryId}: Props) => {
    const {getEntry,updateEntry,removeEntry,moveEntryDown,moveEntryUp,copyEntry} = useUploadDataStore()
    const [clickedElement, setClickedElement] = useState<boolean>(false)
    const {setSelectedEntryId,setSelectedmenu,onOpenMenu,selectedEntryId,isMenuOpen} = useMenuStore()
    const fileInputRef = useRef<HTMLInputElement | null> (null)
    

    console.log("entry", entryId)
    const handleFile = (file:File) => {
        const reader = new FileReader()
        const formData = new FormData()
        formData.append('file', file)
        reader.onload = async () => {
            if(reader.result){
                updateEntry(entryId,reader.result as string,'','small')
                try {
                    const {url} = await UploadMedia(formData)
                    updateEntry(selectedEntryId,url,entryData?.extra1,entryData?.extra2)
                } catch (error) {
                    console.log("Error uploading file", error)
                }
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
            if(event.dataTransfer.files[0].type.startsWith('image/')){
                handleFile(event.dataTransfer.files[0])
            }
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
    <div  className='mt-10 mb-5 px-5 flex flex-col'>
        <div id='myDiv' onClick={() => {setClickedElement(true);setSelectedmenu(type === 'image' ? 'image' : type === 'video' ? 'video' : 'main');setSelectedEntryId(entryId);onOpenMenu()}} className={`hover:border-[2px] transition-all duration-150 ease-in rounded-xl mx-auto ${clickedElement ? "border-2 border-pink-500"  :""} ${entryData?.extra2 === 'large' ? "max-w-screen-lg" :"max-w-screen-md"} relative`}>
            <div onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver} className={`object-cover flex items-center justify-center p-4 max-w-screen-lg transition-all duration-100 ease-in min-h-[400px] ${!entryData?.content ? "bg-gray-100":"bg-white "}  rounded-lg m-1`}>
                {url ? (
                    type === 'image' ? (
                        <img src={url} className='rounded-xl transition-all duration-75 ease-in w-full h-auto' />
                    ):(
                        <video controls className='rounded-xl w-full h-auto' src={url}></video>
                    )
                ):(
                    <label onClick={handleClick} htmlFor="" className='flex flex-col items-center justify-center min-h-[400px] aspect-video'>
                        <div className='text-center'>
                            Drag and drop an {type} , or click to Browse
                        </div>
                        <input ref={fileInputRef} type="file" onChange={handleFileChange} accept={type === 'image' ? "image/*":"video/*"} className='hidden' />
                    </label>
                )}
            </div>
            <div className={`absolute top-0 -right-14 w-10 p-2 py-4 rounded-full flex flex-col items-center justify-center gap-3 bg-white shadow-xl ${isMenuOpen && selectedEntryId === entryId ? "" :"hidden"}`}>
                <ArrowUp onClick={() => moveEntryUp(entryId)} size={16}/>
                <ArrowDown onClick={() => moveEntryDown(entryId)} size={16}/>
                <div className='inline-block bg-neutral-800 h-[0.1px] w-2/4'/>
                <Copy
                    onClick={() => {
                        const newId = uuidv4()
                        copyEntry(entryId,newId)
                    }}
                    size={16}
                />
                <div className='inline-block bg-neutral-800 h-[0.1px] w-2/4'/>
                <Trash2 onClick={() => removeEntry(entryId)} className='text-red-500' size={16} />
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
                <span className='whitespace-nowrap pl-1 text-sm'>
                    Insert Block
                </span>
            </button>
            <div className='line border-2 h-[1.5px] border-pink-500 w-full rounded-full'></div>
        </div>
    </div>
  )
}

export default Firstmedia