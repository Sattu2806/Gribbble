'use client'
import React, { useEffect } from 'react'
import { ShotDataType, FetchUploadDataResponse } from '../_components/RenderShots'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getUploadDataByInifiteQuery, getUploadDataByInifiteQuerySearch } from '@/actions/upload'
import ShotSkeleton from '../_components/ShotSkeleton'
import { useInView } from "react-intersection-observer";
import EachShot from '../_components/EachShot'
import Image from 'next/image'

type Props = {}

const SearchResults = ({params}:{params:{searchString:string}}) => {
    const { ref, inView } = useInView();

    const fetchUploadData = async (take:string, lastCursor:string) => {
        try {
            const response = await getUploadDataByInifiteQuerySearch(take,lastCursor,decodeURIComponent(params.searchString))
            if(response && 'data' in response){
                const {data} = response
                return data
            } else {
                console.log("Unexpected data structure",error)
            }
        } catch (error) {
            console.log("Error fetching data", error)
        }
    }

    const {
        data:UploadData,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
        isLoading
    } = useInfiniteQuery<FetchUploadDataResponse>({
        queryKey: ['upload-shot-data',params.searchString],
        queryFn:({pageParam = ""}) => fetchUploadData("10",`${pageParam}`),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage?.metaData?.lastCursor
        }
    })

    useEffect(() => {
        if(inView && hasNextPage){
            fetchNextPage()
        }
    },[hasNextPage,inView])

    if(isLoading){
        return(
            <ShotSkeleton/>
        )
    }
  return (
    <div className='pt-10'>
        <div className='grid gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1'>
            {UploadData?.pages.map((page,index) => (
                page.data.map((shot,shotindex) => {
                    const isLastShot = page.data.length === shotindex + 1
                    return(
                        <div 
                        key={`${index}-${shotindex}`}
                        ref={isLastShot ? ref : null}
                        >
                            <EachShot shot={shot}/>
                        </div>
                    )
                })
            ))}
            <div className='flex items-center justify-around mt-4'>
                {isFetchingNextPage && (
                    <div className='animate-bounce'>
                        <Image src='/gribbble-icon.webp' width={30} height={30} alt='Icon'/>
                    </div>
                )}
            </div>
        </div>
        {/* <Button onClick={() => fetchNextPage()}>sdvs d</Button> */}
    </div>
  )
}

export default SearchResults