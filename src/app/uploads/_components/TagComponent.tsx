'use client'
import { useContinueStore } from '@/hooks/use-continue-store'
import useUploadDataStore from '@/hooks/use-upload-data'
import React from 'react'
import Select from 'react-select'

type Props = {}

const options = [
    { value: 'discover', label: 'Discover' },
    { value: 'animation', label: 'Animations' },
    { value: 'branding', label: 'Branding' },
    { value: 'illustration', label: 'Illustration' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'print', label: 'Print' },
    { value: 'productdesign', label: 'Product Design' },
    { value: 'typography', label: 'Typography' },
    { value: 'webdesign', label: 'Web Design' },
];

const TagComponent = (props: Props) => {
    const {isContinuosOpen,selectedOption,setSelectedOption,textareaValue,setTextareaValue,extractTags,onCloseContinuos} = useContinueStore()
    

    const SaveShot = () => {

    }
  return (
    <div className={`fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 ${isContinuosOpen ? "scale-100 opacity-100 translate-y-0":"scale-0 opacity-0 -translate-y-96"}`}>
        <div className='w-2/5 max-w-screen-lg mx-auto bg-white p-5 rounded-xl shadow-2xl'>
            <div>
                <h1 className='font-medium pb-2 pl-1 text-sm'>Select Category</h1>
                <Select 
                options={options}
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