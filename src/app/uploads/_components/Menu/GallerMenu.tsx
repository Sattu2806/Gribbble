import React from 'react'
import { useMenuStore } from '@/hooks/use-menu'
import { ChevronRight } from 'lucide-react'
import useUploadDataStore from '@/hooks/use-upload-data'
import { GalleryData } from '../MediaComponents/GalleryComponent'
import { useSelectedSlideStore } from '@/hooks/use-selected-slide'
import { useCarousalApiStore } from '@/hooks/use-carousal-api'

type Props = {}

const GallerMenu = (props: Props) => {
    const {onCloseMenu,selectedEntryId,setSelectedmenu} = useMenuStore()
    const {getEntry,updateEntry} = useUploadDataStore()
    const {setSelectedSlideIndex,selectedSlideIndex} = useSelectedSlideStore()
    const { api, setApi} = useCarousalApiStore()

    const EntryData = getEntry(selectedEntryId)

    let fileObjects : GalleryData[] = []

    try {
        fileObjects = EntryData?.content?.trim() ? JSON.parse(EntryData.content) : []
    } catch (error) {
        console.error("Error parsing the JSON",error)
    }

    const MakeSmall = () => {
        updateEntry(selectedEntryId,EntryData?.content!,EntryData?.extra1,'small')
    }

    const Makelarge = () => {
        updateEntry(selectedEntryId,EntryData?.content!,EntryData?.extra1,'large')
    }

  return (
    <div className={` mt-5`}>
    <button onClick={onCloseMenu} className='mb-5 text-sm'>Close</button>
    <div className='py-2'>
        <div className='flex items-center space-x-4 text-xl font-medium'>
            <span>
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" tabIndex={-1} className="icon-20 margin-r-12"><path d="M20 13a3 3 0 01-3 3v-1.5a1.5 1.5 0 001.5-1.5V7A1.5 1.5 0 0017 5.5V4a3 3 0 013 3v6zM0 7v6a3 3 0 003 3v-1.5A1.5 1.5 0 011.5 13V7A1.5 1.5 0 013 5.5V4a3 3 0 00-3 3z" fill="currentColor"></path><rect x="4.75" y="2.75" width="10.5" height="14.5" rx="2.25" stroke="currentColor" strokeWidth="1.5"></rect></svg>
            </span>
            <span>Gallery</span>
        </div>
        <h1 className='mt-5 mb-2 px-2 font-medium rounded-lg'>Slides</h1>
        <ul>
            {fileObjects.map((file,index) => (
            <li
            key={index}
            onClick={() => {
                setSelectedSlideIndex(index);setSelectedmenu('secondary-gallery')
                if(api){
                    api.reInit({startIndex:index, watchDrag:false})
                }
            }
            }
             className={`px-2 hover:bg-gray-50 rounded-lg py-[6px] text-[15px] flex items-center justify-between ${selectedSlideIndex === index ? "bg-gray-200":""}`}>
                <span>
                    Slide {index+1}
                </span>
                <span>
                    <ChevronRight size={14}/>
                </span>
            </li>
            ))}
        </ul>
        <div className='mt-4 px-2'>
            <label htmlFor="" className='font-medium'>Layout</label>
            <div className='mt-3 grid grid-cols-2'>
                <button onClick={MakeSmall} className={`border-[2px] rounded-s-xl py-3 flex items-center justify-center ${EntryData?.extra2  === 'small' ? 'border-purple-500' : ''}`}>
                    <span>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                    </span>
                </button>
                <button onClick={Makelarge} className={`border-[2px] rounded-e-xl py-3 flex items-center justify-center ${EntryData?.extra2  === 'large' ? 'border-purple-500' : ''}`}>
                    <span>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg" svg-inline="" role="presentation" focusable="false" className="icon-12"><path fillRule="evenodd" clipRule="evenodd" d="M12.53.47a.75.75 0 010 1.06L9.534 4.527h1.856a.75.75 0 010 1.5h-3.64a.748.748 0 01-.777-.75V1.61a.75.75 0 011.5 0v1.857L11.47.47a.75.75 0 011.06 0zM1.61 6.972a.75.75 0 000 1.5h1.857L.47 11.47a.75.75 0 001.06 1.06l2.997-2.997v1.856a.75.75 0 001.5 0v-3.64a.748.748 0 00-.75-.777m-3.667 0h3.667z"></path></svg>
                    </span>
                </button>
            </div>
        </div>
    </div>
</div>
  )
}

export default GallerMenu