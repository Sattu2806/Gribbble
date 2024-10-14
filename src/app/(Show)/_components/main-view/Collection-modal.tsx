'use client'
import { addShotToCollection, createCollection, getCollectionById, getCollectionsForUser, removeShotFromCollection } from '@/actions/collections'
import { useCollectionStore } from '@/hooks/show/use-collection'
import { Collection, Items, Save, Upload } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import { LoaderCircle, Minus, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}

const CollectionModal = (props: Props) => {
    const {isCollectionOpen,onCloseCollection,toCreateCollection,onOpenCollection,onOpenCreateCollection,onCloseCreateCollection} = useCollectionStore()

    const {data:AllCollections} = useQuery({
        queryKey:['all-collections',toCreateCollection],
        queryFn:async() => {
            const res = await getCollectionsForUser()
            if(res.success || res.collections){
                if(res.collections.length === 0 ){
                    onOpenCreateCollection()
                }
                return res.collections
            } else {
                return  []
            }
        }
    })

    console.log(toCreateCollection)

    console.log("all-collections",AllCollections)
  return (
    <div className={`fixed inset-0 z-[9999] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  ${isCollectionOpen ? "":"hidden"}`}>
        <div className='fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg'>
        <div onClick={() => onCloseCollection()} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </div>
            {(AllCollections?.length === 0 || toCreateCollection) ? (
                <CreateCollection AllCollections = {AllCollections}/>
            ):(
                <ChooseCollection/>
            )}
        </div>
    </div>
  )
}

export default CollectionModal

interface ExtendedCollectionType extends Collection {
    saves: (Save & {
        upload: Upload & {
            items: Items[]
        }
    })[]
}


const CreateCollection = ({AllCollections}:{AllCollections:ExtendedCollectionType[] | undefined}) => {
    const [Collectiontitle, setCollectionTitle] = useState<string>()
    const [collectiondescription, setCollectionDescription] = useState<string>()
    const {isCollectionOpen,onCloseCollection,toCreateCollection,onOpenCollection,onOpenCreateCollection,onCloseCreateCollection} = useCollectionStore()

    const addCollection = async () => {
        try {
            CreatCollectionMutation.mutate(undefined,{onSuccess:() => {
                onCloseCreateCollection()
            }})
        } catch (error) {
            console.log("Error adding collection")
        }
    }


    const CreatCollectionMutation = useMutation({
        mutationKey:['addcollection'],
        mutationFn:async() => {
            if(Collectiontitle){
                const res = await createCollection(Collectiontitle,collectiondescription)
                return res
            }
            else{
                return null
            }
        }
    })
    return(
        <div className='grid gap-4'>
            <p className='border-b pb-4'>Create a New Collections</p>
            <div>
                <label htmlFor="" className='block pb-2 font-medium'>Name</label>
                <input type="text" onChange={(e) => setCollectionTitle(e.target.value)} className='px-2 py-3 border-[1px] border-neutral-200 focus:border-pink-400 w-full rounded-lg focus:outline-pink-300' />
            </div>
            <div>
                <label htmlFor="" className='block pb-2 font-medium'>Description</label>
                <textarea onChange={(e) => setCollectionDescription(e.target.value)} className='px-2 py-4 border-[1px] border-neutral-200 focus:border-pink-400 w-full rounded-lg focus:outline-pink-300' />
            </div>
            <div className='flex items-center space-x-3'>
                <button 
                onClick={() => {
                    if(AllCollections?.length === 0){
                        onCloseCollection()
                    }
                    onCloseCreateCollection()
                    setCollectionDescription(undefined)
                    setCollectionTitle(undefined)
                }}
                
                className='px-5 py-[10px] rounded-full bg-neutral-100 border-[1px] border-neutral-300 font-medium text-sm'>
                Cancel
                </button>
                <button
                    onClick={addCollection}
                className='px-5 py-[10px] rounded-full bg-neutral-950 text-white text-sm font-medium flex items-center space-x-1'>
                    {CreatCollectionMutation.isPending && (
                        <LoaderCircle className='animate-spin inline-blockw-6 h-6 rounded-full text-pink-400'/>
                    )}
                    Create Collection
                </button>
            </div>
        </div>
    )
}

const ChooseCollection = () => {
    const {onCloseCollection,toCreateCollection,onOpenCreateCollection} = useCollectionStore()
    const [collectionTitle, setCollectitle] = useState<string>()
    const {data:AllCollections} = useQuery({
        queryKey:['all-collections-filtered',toCreateCollection],
        queryFn:async() => {
            const res = await getCollectionsForUser()
            if(res.success || res.collections){
                if(res.collections.length === 0 ){
                    onOpenCreateCollection()
                }
                return res.collections
            } else {
                return  []
            }
        }
    })

    const filteredCollection = collectionTitle 
    ? AllCollections?.filter(
        (coll) => coll.name?.toLocaleLowerCase().trim().includes(collectionTitle?.toLocaleLowerCase().trim())
      )
    : AllCollections;
  
  

    console.log("filteredCollection",filteredCollection)
    return (
        <div className='flex  flex-col justify-between'>
            <div className='overflow-y-scroll'>
                <h1 className='text-xl mb-3 border-b pb-2 border-neutral-300'>Add this to your collection</h1>
                <div>
                    <input value={collectionTitle} onChange={(e)=>setCollectitle(e.target.value)} type="text" placeholder='filter collections' className='px-4 py-4 border-[2px] border-neutral-200 focus:border-b-pink-400 w-full rounded-lg focus:outline-pink-300' />
                </div>
                <div className='max-h-[300px] overflow-y-scroll'>
                    {filteredCollection && filteredCollection.map((fillcollection) => (
                        <CollectionShow id={fillcollection.id} key={fillcollection.id}/>
                    ))}
                </div>
            </div>
            <div className='flex items-center justify-between w-full mt-3'>
                <button onClick={onOpenCreateCollection} className='px-5 py-[10px] rounded-full bg-neutral-100 border-[1px] border-neutral-300 font-medium text-sm'>
                    Create a collection
                </button>
                <button onClick={onCloseCollection} className='px-5 py-[10px] rounded-full bg-neutral-950 text-white text-sm font-medium flex items-center space-x-1'>
                    Done
                </button>
            </div>
        </div>
    )
}


const CollectionShow = ({id}:{id:string}) => {
    const {uploadId,toggleIsChanged} = useCollectionStore()

    const AddShotToCollectionMutation = useMutation({
        mutationKey:['choosecollection'],
        mutationFn:async() => {
            if(uploadId){
                const res = await addShotToCollection(uploadId,id)
                return res
            }
        }
    })



    const RemoveShotfromCollectionMutation = useMutation({
        mutationKey:['removeshotfromcollection'],
        mutationFn:async() => {
            if(uploadId){
                const res = await removeShotFromCollection(uploadId,id)
                return res
            }
        }
    })
    const {data:collection} = useQuery({
        queryKey:['individual-collections',AddShotToCollectionMutation.isSuccess,RemoveShotfromCollectionMutation.isSuccess,id],
        queryFn:async() => {
            const res = await getCollectionById(id)
            if(res.success || res.collection){
                return res.collection
            }
        }
    })
    

    const handleAddshottocollection = () => {
        AddShotToCollectionMutation.mutate(undefined, {onSuccess:() => {
            toggleIsChanged()
        }})
    }

    const handleremoveshotfromCollection = () => {
        RemoveShotfromCollectionMutation.mutate(undefined, {onSuccess:() => {
            toggleIsChanged()
        }})
    }

    const showMinus = collection?.saves.find((save) => save.uploadId === uploadId)
    return(
        <div onClick={handleAddshottocollection} className='my-2 border-[1px] border-neutral-300 rounded-md p-2 py-4 bg-gray-50 relative cursor-pointer flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <div>
                        {collection && collection.saves && collection.saves.length > 0 ? (
                            <Image src={collection.saves[0].upload.items[0].type === 'gallery'?"/":collection.saves[0].upload.items[0].content} alt={collection.saves[0].upload.id} width={70} height={54} className='z-50 border-2 border-neutral-300 rounded-sm'/>
                        ):(
                            <Image src='/collection-project.png' alt='Demo-Image' width={70} height={70} />
                        )}
                    </div>
                    <div>
                        <p className='font-medium text-sm'>{collection?.name}</p>
                        <p className='text-xs text-neutral-400'>{collection?.saves.length} shots</p>
                    </div>
                </div>
            {showMinus && (
                <div onClick={(event) => {
                    event.stopPropagation()
                    handleremoveshotfromCollection()
                }} className='bg-neutral-200 w-[30px] flex items-center justify-center rounded-md mr-5 z-[9999]'>
                    <Minus size={30} className='text-white' strokeWidth={4}/>
                </div>
            )}
        </div>
    )
}