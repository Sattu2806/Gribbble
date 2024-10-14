'use client'
import React, { useRef, useState } from 'react'
import UploadNav from './UploadNav'
import Firstmedia from './MediaComponents/Firstmedia'
import { useMenuStore } from '@/hooks/use-menu'
import SideBarMenu from './Menu/SideBarMenu'
import useUploadDataStore from '@/hooks/use-upload-data'
import {v4 as uuidv4} from "uuid"
import useEditorStore from '@/hooks/use-editor'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import EditorComp from './TextComponent/EditorComp'
import MainTextComp from './TextComponent/MainTextComp'
import ImageComponent from './MediaComponents/ImageComponent'
import VideoComponent from './MediaComponents/VideoComponent'
import GalleryCompnent from './MediaComponents/GalleryComponent'
import { UploadMedia } from '@/actions/cloudinary'
import { useTitleStore } from '@/hooks/use-title'


type Props = {}

enum STEPS {
    UPLOAD_MEDIA = 0,
    OTHER_STUFF = 1
}

const UploadComponent = (props: Props) => {
    const [step, setStep] = useState(STEPS.UPLOAD_MEDIA)
    const fileInputRef = useRef<HTMLInputElement | null> (null)
    const [LocalUrl, setLocalUrl] = useState<string>()
    const [fileType, setFileType] = useState<"image" | "video">("image")
    const {setTitle,title} = useTitleStore()
    const {isMenuOpen} = useMenuStore()
    const {entries, addEntry,updateEntry,getEntry} = useUploadDataStore()
    const {createEditor} = useEditorStore()
    


    const onNext = () => {
        setStep((value) => value + 1)
    }


    const handleFile = (file:File) => {
        const reader = new FileReader()
        const id = uuidv4()
        const formData = new FormData()
        formData.append('file', file)
        reader.onload = async () => {
            if(reader.result){
                if(file.type.startsWith('image/')){
                    setFileType('image')
                    addEntry(id,'image',reader.result as string,'','large')
                    addEditor()

                    try {
                        const {url} = await UploadMedia(formData)
                        const entryData = getEntry(id)
                        updateEntry(id,url,entryData?.extra1,entryData?.extra2)
                    } catch (error) {
                        console.log("Error uploading file", error)
                    }
                }else if(file.type.startsWith('video/')){
                    setFileType('video')
                    addEntry(id,'video',reader.result as string,'','large')
                    addEditor()
                    try {
                        const {url} = await UploadMedia(formData)
                        const entryData = getEntry(id)
                        updateEntry(id,url,entryData?.extra1,entryData?.extra2)
                    } catch (error) {
                        console.log("Error uploading file", error)
                    }
                }
                setLocalUrl(reader.result as string)
            }
        }
        reader.readAsDataURL(file)
    }

    const addEditor = () => {
        const newEditor = createEditor({
            extensions:[
                StarterKit,Underline,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Link.configure({
                    openOnClick: true,
                    defaultProtocol:'https'
                })
            ],
            editorProps:{
                attributes:{
                    class:'prose w-full leading-3 p-5 focus:outline-[2px] focus:border-[2px] focus:border-pink-500 focus:outline-pink-500 rounded-xl transition-all ease-in duration-150 prose-a:font-semibold prose-a:text-pink-500 prose:leading-loose'
                }
            },
            content: `          
            <div>
                <p>
                  Write about post...
                </p>
            </div>
            `
        })
        
        addEntry(newEditor,'text')
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            handleFile(event.target.files[0])
        }
        onNext()
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
        onNext()
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

    console.log("enteries", entries)
  return (
    <div>
        <div className={`transition-all ease-in duration-200 ${isMenuOpen ? "w-[calc(100vw-400px)]" :"w-full"}`}>
            <UploadNav/>
            <SideBarMenu/>
            <div className='content-container pt-10'>
                <div>
                    {step === STEPS.UPLOAD_MEDIA && (
                        <div>
                            <h2 className='text-center md:text-3xl font-bold text-2xl'>What you have been working on?</h2>
                            <div 
                            onClick={handleClick}
                            onDrop={handleDrop}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                             className='border-[2px] border-dashed rounded-lg mt-12 flex justify-around md:w-9/12 w-11/12 mx-auto cursor-pointer'>
                                <div className='flex flex-col items-center justify-center py-40 w-full'>
                                    <div className='flex flex-col items-center justify-center'>
                                        <img src="/pic.png" className='w-24' alt="Image" />
                                        <div className='text-center pt-3'>
                                            Drag and Drop a Media or
                                            <span className='text-pink-500'> Browse</span>
                                        </div>
                                    </div>
                                    <div className='text-sm pt-5 text-neutral-500 text-center'>
                                        <span>Minimum 1600px width recommended.Max 10MB </span>
                                        <span>Max 10MB each</span>
                                        <span> (20 MB for Video)</span>
                                    </div>
                                    <ul className='grid md:grid-cols-2 grid-cols-1 text-sm pt-10 gap-x-16 gap-2 text-neutral-500 list-disc'>
                                        <li>High resolution images (png, jpg, gif)</li>
                                        <li>Video (mp4)</li>
                                        <li>Animated gif</li>
                                        <li>Only upload media you own the rights to</li>
                                    </ul>
                                </div>
                            </div>
                            <input 
                            type="file"
                            ref={fileInputRef}
                            className='hidden'
                            accept='image/*,video/*'
                            onChange={handleFileChange}
                             />
                        </div>
                    )}
                    {step === STEPS.OTHER_STUFF && (
                        <div>
                            <div>
                                <div className='w-9/12 mx-auto'>
                                    <textarea name="" id="" cols={30} rows={1} placeholder='Give me a name' className='focus:outline-none text-4xl font-bold' value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                                </div>
                            </div>
                            <div className='pb-20'>
                                {entries.map((entry,index) => {
                                    if((entry.type === 'image' || entry.type === 'video' ) && index === 0){
                                        return(
                                            <Firstmedia key={entry.id} url={entry.content} type={entry.type} entryId={entry.id}/>
                                        )
                                    } else if(entry.type === 'text'){
                                        return(
                                            <MainTextComp key={entry.id} entryId={entry.id}/>
                                        )
                                    } else if(entry.type === 'image'){
                                        return(
                                            <ImageComponent key={entry.id} entryId={entry.id}/>
                                        )
                                    } else if(entry.type === 'video'){
                                        return(
                                            <VideoComponent key={entry.id} entryId={entry.id} />
                                        )
                                    } else if(entry.type === 'gallery'){
                                        return(
                                            <GalleryCompnent key={entry.id} entryId={entry.id}/>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default UploadComponent