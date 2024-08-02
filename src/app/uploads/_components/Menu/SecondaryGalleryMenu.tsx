import { useMenuStore } from '@/hooks/use-menu'
import { useSelectedSlideStore } from '@/hooks/use-selected-slide'
import useUploadDataStore from '@/hooks/use-upload-data'
import { ChevronLeft } from 'lucide-react'
import React, { useRef } from 'react'
import { GalleryData } from '../MediaComponents/GalleryComponent'
import { UploadMedia } from '@/actions/cloudinary'

type Props = {}

const SecondaryGalleryMenu = (props: Props) => {
    const {onCloseMenu,selectedEntryId,setSelectedmenu} = useMenuStore()
    const {getEntry,updateEntry} = useUploadDataStore()
    const {selectedSlideIndex} = useSelectedSlideStore()

    const EntryData = getEntry(selectedEntryId)

    const fileInputRef = useRef<HTMLInputElement | null> (null)
    const entryData = getEntry(selectedEntryId)

    const ChangeMedia = (index:number, newUrl:string) => {
        const files = fileObjects.map((file,i) => 
            i === index ? {...file, url:newUrl} : file
        )

        updateEntry(selectedEntryId,JSON.stringify(files),entryData?.extra1,entryData?.extra2)
    }
    
    const handleFile = (file:File) => {
        const reader = new FileReader()
        const formData = new FormData()
        formData.append('file', file)
        reader.onload = async () => {
            if(reader.result){
                const Localurl = URL.createObjectURL(file)
                ChangeMedia(selectedSlideIndex,Localurl)
                try {
                    const {url} = await UploadMedia(formData)
                    ChangeMedia(selectedSlideIndex,url)
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

    const ChangeAltText = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = fileObjects.map((file,i) => 
            i === selectedSlideIndex ? {...file, alt:event.target.value} : file
        )

        updateEntry(selectedEntryId,JSON.stringify(files))
    }

    let fileObjects : GalleryData[] = []

    try {
        fileObjects = EntryData?.content?.trim() ? JSON.parse(EntryData.content) : []
    } catch (error) {
        console.error("Error parsing the JSON",error)
    }

    const toShowData = fileObjects[selectedSlideIndex ?? 0]

    console.log("showData", toShowData)

  return (
    <div>
        <button onClick={onCloseMenu} className='mb-5 mt-5 text-sm'>Close</button>
        <button onClick={() => {setSelectedmenu('gallery')}} className='text-sm block mb-5'>
            <ChevronLeft size={24} strokeWidth={1.5}/>
        </button>
        <div>
            <div>
                <div className='flex items-center space-x-3 mb-8'>
                    <span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path fillRule="evenodd" clipRule="evenodd" d="M16 1.5H4A2.5 2.5 0 001.5 4v12a2.5 2.5 0 001.265 2.174l9.29-9.29a2.75 2.75 0 013.89 0l2.555 2.555V4A2.5 2.5 0 0016 1.5zm2.5 12.059a.741.741 0 01-.03-.029l-3.586-3.586a1.25 1.25 0 00-1.768 0L4.561 18.5H16a2.5 2.5 0 002.5-2.5v-2.441zM4 0a4 4 0 00-4 4v12a4 4 0 004 4h12a4 4 0 004-4V4a4 4 0 00-4-4H4zm2.5 5.75a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"></path></svg>
                    </span>
                    <h4 className='text-xl font-semibold'>{toShowData?.type === 'image' ? "Image" : 'Video'}</h4>
                </div>
                <div>
                    <span className='font-semibold block mb-2'>Media</span>
                    <div className='p-4 border-[1px] border-gray-200 rounded-lg'>
                            <div className='mb-6'>
                                {toShowData ? (
                                    toShowData?.type === 'image' ? (
                                        <img className='object-cover w-52' src={toShowData?.url} alt={toShowData?.alt} />
                                    ):(
                                        <video className='object-cover w-52'  src={toShowData?.url} />
                                    )
                                ):(
                                    <div>
                                        <div className='py-2 px-3 bg-white rounded-lg text-center border-[1px] mt-4 mb-2 fonseme
                                        text-sm text-neutral-800'>
                                                Select media
                                        </div>
                                        <p className='text-center text-sm text-neutral-500'>or drop media to upload</p>
                                    </div>
                                )}
                            </div>
                            <div className='flex items-center justify-between space-x-3 mt-2  w-full'>
                            <label onClick={handleClick} className='relative cursor-pointer w-full text-center'>
                                <div  className='px-6 py-[8px] font-medium text-[14px] border-[1px] rounded-lg hover:border-gray-300 w-full'>
                                    Change
                                </div>
                            </label>
                                <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className='hidden'
                                accept={toShowData?.type === 'image' ? 'image/*':'video/*'}
                                />
                            </div>
                    </div>
                    <div className='mt-12'>
                        <label className='font-semibold'>Alt text</label>
                        <div className='mt-3'>
                                <span className={`p-3 border-2 rounded-lg`}>
                                    <input 
                                    className={`outline-none bg-transparent focus:outline-none h-[40px] text-xl placeholder:text-[14px] break-before-auto break-words break-normal whitespace-pre`}
                                    type="text"
                                    defaultValue={toShowData?.alt}
                                    onChange={ChangeAltText}
                                    placeholder='Enter all text ....'
                                     />
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SecondaryGalleryMenu