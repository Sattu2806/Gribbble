import React, { useEffect, useRef, useState } from 'react'
import useUploadDataStore from '@/hooks/use-upload-data'
import { useMenuStore } from '@/hooks/use-menu'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { useSelectedSlideStore } from '@/hooks/use-selected-slide'
import { useCarousalApiStore } from '@/hooks/use-carousal-api'
import { ArrowDown, ArrowUp, Copy, Trash2,Plus } from 'lucide-react'
import {v4 as uuidv4} from "uuid"
import { UploadMedia } from '@/actions/cloudinary'

type Props = {
    entryId:string
}


export interface GalleryData {
    type: 'image' | 'video'
    url:string
    alt:string
}


const GalleryCompnent = ({entryId}: Props) => {
    const {getEntry,updateEntry,removeEntry,moveEntryDown,moveEntryUp,copyEntry} = useUploadDataStore()
    const [clickedElement, setClickedElement] = useState<boolean>(false)
    const {setSelectedEntryId,setSelectedmenu,onOpenMenu,selectedEntryId,isMenuOpen} = useMenuStore()
    const fileInputRef = useRef<HTMLInputElement | null> (null)
    const EntryData = getEntry(entryId)
    // const [api, setApi] = React.useState<CarouselApi>()
    const { api, setApi} = useCarousalApiStore()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)
    const {setSelectedSlideIndex, selectedSlideIndex} = useSelectedSlideStore()
    const GalleryObjects : GalleryData[] = EntryData?.content ? JSON.parse(EntryData.content) : [] 

    
    // const handleFile = async (files:FileList) => {
    //     if(files){
    //         const newFileObject: GalleryData[] = []
    //         for (const file of Array.from(files)){
    //             const LocalUrl = URL.createObjectURL(file)
    //             newFileObject.push({url:LocalUrl, type:file.type.startsWith('image/') ? "image" : "video", alt:file.name})
    //         }
            
    //         updateEntry(entryId,JSON.stringify([...GalleryObjects,...newFileObject]),EntryData?.extra1,EntryData?.extra2)

    //         for(let i = 0 ; i < GalleryObjects.length ; i++){
    //             const file = files[i]
    //             const formData = new FormData()
    //             formData.append("file",file)
    //             try {
    //                 const {url} = await UploadMedia(formData)
    //                 newFileObject[i].url = url

    //                 const updatedNewFileObject = [...GalleryObjects,...newFileObject]
    //                 console.log("updatedNewFileObject",updatedNewFileObject)

    //                 updateEntry(entryId,JSON.stringify(updatedNewFileObject),EntryData?.extra1,EntryData?.extra2)
    //             } catch (error) {
    //                 console.log("Error uploading file", error)
    //             }
    //         }
    //     }

    //     if(fileInputRef.current){
    //         fileInputRef.current.value = ''
    //     }

    // }


const handleFile = async (files: FileList) => {
    if (files) {
        const newFileObject: GalleryData[] = [];
        const fileArray = Array.from(files);

        fileArray.forEach(file => {
            const localUrl = URL.createObjectURL(file);
            newFileObject.push({
                url: localUrl,
                type: file.type.startsWith('image/') ? "image" : "video",
                alt: file.name
            });
        });

        const updatedGallery = [...GalleryObjects, ...newFileObject];
        updateEntry(entryId, JSON.stringify(updatedGallery), EntryData?.extra1, EntryData?.extra2);

        // Upload files
        for (let i = 0; i < fileArray.length; i++) {
            const file = fileArray[i];
            const formData = new FormData();
            formData.append("file", file);

            try {
                const { url } = await UploadMedia(formData);
                newFileObject[i].url = url;

                const updatedNewFileObject = [...GalleryObjects, ...newFileObject];
                console.log("updatedNewFileObject", updatedNewFileObject);

                updateEntry(entryId, JSON.stringify(updatedNewFileObject), EntryData?.extra1, EntryData?.extra2);
            } catch (error) {
                console.log("Error uploading file", error);
            }
        }
    }

    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
};

    useEffect(() => {
        if(api){
            const length = GalleryObjects.length - 1
            api.reInit({startIndex:length,watchDrag:false})
            setSelectedSlideIndex(GalleryObjects.length - 1)
        }
    },[EntryData])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files.length > 0){
            handleFile(event.target.files)
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
            handleFile(event.dataTransfer.files)
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

    const deleteMedia = (index:number) => {
        const updatedFileObjects = GalleryObjects.filter((_,i) => i !== index)
        updateEntry(entryId, JSON.stringify(updatedFileObjects))
    }


    React.useEffect(() => {
        if (!api) {
          return
        }
     
        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)
     
        api.on("select", () => {
          setCurrent(api.selectedScrollSnap() + 1)
          
        })
      }, [api])

      useEffect(() => {
        setSelectedSlideIndex(current - 1)
      },[current])
    
  return (
    <div className='flex flex-col mt-20'>
        <div 
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver} 
            id='myDiv' className={`relative hover:border-2 transition-all duration-100 ease-in ${EntryData?.extra2 === 'large' ? "max-w-screen-lg":"max-w-screen-md"} ${clickedElement ? "border-2 border-pink-500"  :""} relative rounded-lg mx-auto`}>
            <div onClick={() => {setSelectedmenu('gallery');setSelectedEntryId(entryId);onOpenMenu();setClickedElement(true)}} className={`flex items-center justify-center min-h-[400px] ${!EntryData?.content ? "bg-gray-50":"bg-white"} aspect-video transition-all ease-in duration-200 rounded-xl m-4`}>
                {GalleryObjects.length > 0 ? (
                    <Carousel setApi={setApi}>
                        <CarouselContent>
                            {GalleryObjects.map((fileObj,index) => (
                                <CarouselItem key={index} className='w-full h-full' style={{width:'100% !important'}}>
                                    {fileObj.type === 'image' ? (
                                        <img src={fileObj.url} alt={fileObj.alt} className='rounded-xl max-w-full h-auto' />
                                    ):(
                                        <video src={fileObj.url} className='rounded-xl max-w-full h-auto' controls />
                                    )}
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='left-5' />
                        <CarouselNext className='right-5' />
                    </Carousel>
                ):(
                    <label onClick={handleClick} htmlFor="" className='flex flex-col items-center justify-center min-h-[400px] aspect-video'>
                    <div className='text-center'>
                        Drag and drop an file , or click to Browse
                    </div>
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
            <div className='h-[90px] w-full flex items-center justify-center overflow-x-auto'>
                <div className='flex items-center space-x-3'>
                    {GalleryObjects.length>0 && GalleryObjects.map((fileObj, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectedSlideIndex(index)
                                if(api){
                                    api.reInit({startIndex:index,watchDrag:false})
                                }
                            }}
                            className={`w-[80px] h-[70px] rounded-lg border-neutral-300 flex items-center justify-center cursor-pointer space-x-2 relative  ${selectedSlideIndex === index ? "border-pink-500 border-2":"*:"}`}
                        >
                            {fileObj.type === 'image' ? (
                                <img src={fileObj.url} alt={fileObj.alt} className='rounded-lg aspect-video w-full h-full' />
                            ):(
                                <video src={fileObj.url} className='rounded-lg aspect-video w-full h-full' />
                            )}
                            <div onClick={() => deleteMedia(index)} className='p-1 rounded-full bg-white absolute top-0 right-0'>
                                <Trash2 size={14} className='text-red-500' />
                            </div>
                        </div>
                    ))}
                    <div onClick={handleClick} className='w-[80px] h-[70px] border-dashed border-[1.5px]  rounded-lg border-neutral-300 flex items-center justify-center hover:border-pink-500 cursor-pointer'>
                        <Plus className='text-neutral-500'/>
                        <input ref={fileInputRef} onChange={handleFileChange} type="file" multiple accept='image/*,video/*' className='hidden' />
                    </div>
                </div>
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

export default GalleryCompnent