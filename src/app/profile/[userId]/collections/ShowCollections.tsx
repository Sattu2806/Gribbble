'use client'
import { getCollectionsForUser } from '@/actions/collections'
import { GalleryData } from '@/app/uploads/_components/MediaComponents/GalleryComponent'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import Image from 'next/image'

type Props = {}

const ShowCollections = (props: Props) => {
    const {data:CollectionData} = useQuery({
        queryKey: ['collections-profile'],
        queryFn:async() => {
            const collections = await getCollectionsForUser()
            return collections
        }
    })

  return (
    <div className='pt-10 max-w-screen-xl mx-auto'>
        <div className='grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {CollectionData?.collections?.map((collection) => {
                    const handleFirstItem = () => {
                        if(collection.saves.length === 0) return null
                        const firstItem = collection.saves[0]?.upload.items[0]
                        if(firstItem.type === 'image'){
                          return {type:'image',content:firstItem.content}
                        } else if (firstItem.type === 'video'){
                          return {type:'video',content:firstItem.content}
                        } else if (firstItem.type === 'gallery'){
                          try {
                            const parsedContent : GalleryData[] = JSON.parse(firstItem.content)
                            if(Array.isArray(parsedContent)){
                              const imageOrvideo = parsedContent.find((media) => media.type === 'video' || media.type === 'image' )
                  
                              return {
                                type:imageOrvideo?.type,
                                content:imageOrvideo?.url
                              }
                            }
                          } catch (error) {
                            console.error("Failed to pared the gallery component")
                          }
                        } else {
                          return null
                        }
                      }
                
                const FirstItem = handleFirstItem()
                return(
                    <div key={collection.id}>
                        {FirstItem && FirstItem.content && FirstItem.type === 'image' && (
                        <Image src={FirstItem.content} alt={FirstItem.content} width={400} height={400} className='rounded-lg w-full h-[200px]' />
                        )}
                        {FirstItem && FirstItem.content && FirstItem.type === 'video' && (
                        <video src={FirstItem.content} autoPlay muted loop className='rounded-lg w-full h-[200px] object-cover' />
                        )}
                        {collection.saves.length === 0 && (
                            <div className='text-center flex items-center justify-center text-lg font-bold text-gray-500 h-full w-full bg-slate-300 rounded-lg'>
                                No saves yet
                            </div>
                        )}
                        <p className='text-center pt-3 text-sm font-medium'>{collection.name}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ShowCollections