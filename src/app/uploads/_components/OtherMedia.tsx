import React from 'react'

type Props = {
    data:string | null | undefined
    type: 'video' | 'image'
}

const OtherMedia = ({data, type}: Props) => {
  return (
    <div>
        <div className='p-4 border-[1px] border-gray-200 rounded-lg'>
            <div className='mb-6'>
                {data ? (
                    type === 'image' ? (
                        <img className='object-cover w-52' src={data} alt="SelectedImage" />
                    ): type === 'video' ? (
                        <video  className='object-cover w-52' src={data} />
                    ) : null
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
            <div className='flex items-center justify-between space-x-3 mt-2'>
                <label htmlFor="fileInput" className='relative cursor-pointer'>
                    <div className='px-6 py-[8px] font-medium text-[14px] border-[1px] rounded-lg hover:border-gray-300'>
                        Change
                    </div>
                    <input 
                    type="file"
                    id="fileInput"
                    className='hidden'
                    accept={type === 'image' ? 'image/*':'video/*'}
                     />
                </label>
                <button className='px-6 py-[8px] font-medium text-[14px] border-[1px] rounded-lg hover:border-gray-300'>Remove</button>
            </div>
        </div>
        <label className='drag-drop'>
            <input 
                type="file"
                id="fileInput"
                className='hidden'
                accept={type === 'image' ? 'image/*':'video/*'}
                    />
        </label>
    </div>
  )
}

export default OtherMedia