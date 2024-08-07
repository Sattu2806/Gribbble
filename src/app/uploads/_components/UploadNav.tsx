import { useContinueStore } from '@/hooks/use-continue-store'
import useUploadDataStore from '@/hooks/use-upload-data'
import Link from 'next/link'
import React from 'react'

type Props = {}

const UploadNav = (props: Props) => {
    const {onOpenContinuos} = useContinueStore()
    const {entries} = useUploadDataStore()
  return (
    <div className='flex-1 pt-6 sticky top-0 bg-white z-50'>
        <div className='flex items-center justify-between sticky top-5 z-10'>
            <div>
                <Link href='/' className='px-3 py-2 border-[1px] rounded-full text-xs font-medium'>Cancel</Link>
            </div>
            <div className='flex items-center justify-between'>
                <div className='pr-4'>
                    <button className='px-3 py-2 bg-neutral-100 border-[1px] rounded-full text-xs font-medium'>
                        Save as Draft
                    </button>
                </div>
                <div className='pr-4'>
                    <button onClick={() => {
                        if(entries.length > 0){
                            onOpenContinuos()
                        }
                    }} className='px-3 py-2 bg-neutral-900 text-white border-[1px] rounded-full text-xs font-medium'>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UploadNav