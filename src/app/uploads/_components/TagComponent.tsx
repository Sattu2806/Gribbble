'use client'
import { makeUpload } from '@/actions/upload'
import { useContinueStore } from '@/hooks/use-continue-store'
import useEditorStore from '@/hooks/use-editor'
import { useTitleStore } from '@/hooks/use-title'
import useUploadDataStore from '@/hooks/use-upload-data'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { getAllCategories } from '@/actions/category'

type Props = {}


const TagComponent = (props: Props) => {
    const {isContinuosOpen,selectedOption,setSelectedOption,textareaValue,setTextareaValue,extractTags,onCloseContinuos,tagsArray} = useContinueStore()
    const {entries,updateEntry,getEntry} = useUploadDataStore()
    const {getEditor} = useEditorStore()
    const {title} = useTitleStore()
    const router =useRouter()
    const [categories, setCategories] = useState<{value:string, label:string}[]>([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories()
                if(response){
                    setCategories(response)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchCategories()
    },[])

    const SaveShot = async () => {
        const updatedEntries = entries.map((entry) => {
            if(entry.type === 'text'){
                const editor = getEditor(entry.id)
                const entryData = getEntry(entry.id)
                if(editor){
                    return{
                        ...entry,
                        content: editor.getHTML(),
                    }
                }
            }

            return entry
        }) 

        const selectedOptionValue = selectedOption ? selectedOption.value :''

        const dataToSend = {
            title,
            entries:updatedEntries,
            categoryId:selectedOptionValue,
            tagsArray
        }

        try {
            const response = await makeUpload(dataToSend)
            // if(response?.sucess ){
            //     router.push('/')
            // } else {
            //     toast('Error creating the shot')
            // }
            router.push('/')
        } catch (error) {
            toast('Error creating the shot')
            console.error(error)
        }
    }
  return (
    <div className={`fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 ${isContinuosOpen ? "scale-100 opacity-100 translate-y-0":"scale-0 opacity-0 -translate-y-96"}`}>
        <div className='w-2/5 max-w-screen-lg mx-auto bg-white p-5 rounded-xl shadow-2xl'>
            <div>
                <h1 className='font-medium pb-2 pl-1 text-sm'>Select Category</h1>
                <Select 
                options={categories}
                placeholder='category'
                value={selectedOption}
                onChange={(option) => setSelectedOption(option)}
                styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? 'grey' : 'pink',
                      borderWidth:'2px',
                      borderRadius:'20px'
                    }),
                }}
                 />
            </div>
            <div className='my-5'>
                <h1 className='font-medium pb-2 pl-1 text-sm'>
                    Write Tags <span className='text-xs font-medium text-neutral-500'>(e.g. #web)</span>
                </h1>
                <textarea 
                    value={textareaValue}
                    onChange={(e) => {
                        extractTags(e.target.value)
                        setTextareaValue(e.target.value)
                    }}
                    className='w-full outline-none border-[2px] focus:border-pink-500 border-gray-500 rounded-lg p-2'
                ></textarea>
            </div>
            <div className='flex items-center justify-between'>
                <button onClick={onCloseContinuos} className='px-3 py-1 border-[1px] border-neutral-700 rounded-full text-neutral-700'>
                    Cancel
                </button>
                <button onClick={SaveShot} className='px-3 py-1 borde-[1px] border-neutral-700 rounded-full text-white bg-neutral-800'>Save</button>
            </div>
        </div>
    </div>
  )
}

export default TagComponent