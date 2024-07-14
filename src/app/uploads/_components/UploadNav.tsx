import React from 'react'

type Props = {}

const UploadNav = (props: Props) => {
  return (
    <div className='flex-1 pt-6 sticky top-0 bg-white z-50'>
        <div className='flex items-center justify-between sticky top-5 z-10'>
            <div>
                <button className='px-3 py-2 border-[1px] rounded-full text-xs font-medium'>Cancel</button>
            </div>
            <div className='flex items-center justify-between'>
                <div className='pr-4'>
                    <button className='px-3 py-2 bg-neutral-100 border-[1px] rounded-full text-xs font-medium'>
                        Save as Draft
                    </button>
                </div>
                <div className='pr-4'>
                    <button className='px-3 py-2 bg-neutral-900 text-white border-[1px] rounded-full text-xs font-medium'>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UploadNav