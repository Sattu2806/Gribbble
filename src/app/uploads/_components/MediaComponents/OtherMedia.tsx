import { useMenuStore } from '@/hooks/use-menu'
import useUploadDataStore from '@/hooks/use-upload-data'
import React, { useRef } from 'react'

type Props = {

}

const OtherMedia = () => {
    const {selectedEntryId} = useMenuStore()
    const {updateEntry, getEntry}  =useUploadDataStore()
    const fileInputRef = useRef<HTMLInputElement | null> (null)
    
    const handleFile = (file:File) => {
        const reader = new FileReader()
        reader.onload = async () => {
            if(reader.result){
                updateEntry(selectedEntryId,reader.result as string,'','small')
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

    const entryData = getEntry(selectedEntryId)

    const removeData = () => {
        updateEntry(selectedEntryId,null)
    }

  return (
    <div>
        <div className='p-4 border-[1px] border-gray-200 rounded-lg'>
            <div className='mb-6'>
                {entryData?.content ? (
                    entryData.type === 'image' ? (
                        <img className='object-cover w-52' src={entryData.content} alt="SelectedImage" />
                    ): entryData.type === 'video' ? (
                        <video  className='object-cover w-52' src={entryData.content} />
                    ) : null
                ):(
                    <div 
                    onDrop={handleDrop}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    >
                        <div className='py-2 px-3 bg-white rounded-lg text-center border-[1px] mt-4 mb-2 fonseme
                        text-sm text-neutral-800'>
                                Select media
                        </div>
                        <p className='text-center text-sm text-neutral-500'>or drop media to upload</p>
                    </div>
                )}
            </div>
            <div className='flex items-center justify-between space-x-3 mt-2'>
                <label onClick={handleClick} className='relative cursor-pointer'>
                    <div  className='px-6 py-[8px] font-medium text-[14px] border-[1px] rounded-lg hover:border-gray-300'>
                        Change
                    </div>
                </label>
                    <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                    accept={entryData?.type === 'image' ? 'image/*':'video/*'}
                     />
                <button onClick={removeData} className='px-6 py-[8px] font-medium text-[14px] border-[1px] rounded-lg hover:border-gray-300'>Remove</button>
            </div>
        </div>
    </div>
  )
}

export default OtherMedia