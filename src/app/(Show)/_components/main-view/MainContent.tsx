import React from 'react'
import { Items, Upload, User } from '@prisma/client'
import Image from 'next/image'
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { GalleryData } from '@/app/uploads/_components/MediaComponents/GalleryComponent'

interface ShotDataType extends Upload {
    items:Items[]
    user:User
}

type Props = {
    shotData:ShotDataType | undefined
}


const MainContent = ({shotData}: Props) => {

  return (
    <div className='mt-5'>
        {shotData?.items.map((item,index) => {
            if(item.type === 'text'){
                return(
                    <div key={index} className='prose my-20  w-full p-10' dangerouslySetInnerHTML={{__html:item.content}}></div>
                )
            } else if(item.type === 'image'){
                return (
                    <Image key={index} src={item.content} alt={item.extra1} className={`${item.extra2 === 'large' ? "w-full" :"w-4/5"} mx-auto my-5 rounded-xl`} width={1000} height={1000} />
                )
            } else if (item.type === 'video'){
                return(
                    <video key={index} src={item.content} className={`${item.extra2 === 'large' ? "w-full" :"w-4/5"} mx-auto my-5 rounded-xl`} loop autoPlay muted />
                )
            } else if(item.type === 'gallery'){
                const  galleryItems = item.content
                const GalleryObjects: GalleryData[] = JSON.parse(galleryItems)
                return(
                    <Carousel key={index}>
                    <CarouselContent>
                        {GalleryObjects.map((fileObj,index) => (
                            <CarouselItem key={index} className='w-full h-full' style={{width:'100% !important'}}>
                                {fileObj.type === 'image' ? (
                                    <img src={fileObj.url} alt={fileObj.alt} className='rounded-xl max-w-full h-auto' />
                                ):(
                                    <div className='flex items-center justify-center'>
                                    <video src={fileObj.url} className='rounded-xl max-w-full h-auto object-cover' controls />
                                    </div>
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className='left-5' />
                    <CarouselNext className='right-5' />
                </Carousel>
                )
            } else {
                return(
                    <div key={item.id}></div>
                )
            }
        })}
    </div>
  )
}

export default MainContent