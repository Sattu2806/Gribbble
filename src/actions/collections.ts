"use server"
import prisma from "@/app/prismadb"  // Adjust the import path if necessary
import { auth } from "@/auth"

export const getCollectionsForUser = async () => {
    const session = await auth()
    if(!session?.user) return {error:"User is not authenticated"}

    try {
        const  collections = await prisma.collection.findMany({
            where:{
                userId:session.user.id
            },
            include:{
                saves:{
                    include:{
                        upload:{
                            include:{
                                items:true
                            }
                        }
                    }
                }
            }
        })

        return {success:true, collections}
    } catch (error) {
        console.error('Error retrieving the collections', error)
        return {error:"Error retrieving the collections"}
    }
}

export const createCollection = async(name:string,description?:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}

    try {
        const newCollection = await prisma.collection.create({
            data:{
                name,
                description,
                userId:session.user.id
            }
        })

        return {success:true}
    } catch (error) {
        console.error('Error creating the collection', error)
        return {error:"Error creating the collection"}
    }
}


export const deleteCollection = async(collectionId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}

    try {
        await prisma.collection.delete({
            where:{
                id:collectionId
            }
        })

        return {success:true}
    } catch (error) {
        console.error('Error deleting the collection', error)
        return {error:"Error deleting the collection"}
    }
}

export const addShotToCollection = async (uploadId:string,collectionId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}

    try {
        await prisma.save.create({
            data:{
                uploadId,
                collectionId,
                userId:session.user.id
            }
        })

        return {success:true}
    } catch (error) {
        console.error('Error adding shot to the collection', error)
        return {error:"Error adding shot to the collection"}
    }
}

export const removeShotFromCollection = async (uploadId:string,collectionId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}

    const save = await prisma.save.findUnique({
        where:{
            userId_uploadId:{
                userId:session.user.id,
                uploadId
            },
            collectionId
        }
    })

    console.log("save",save)
    
    if(!save) return {error:"Save not found"}

    try {
        await prisma.save.delete({
            where:{
                id:save.id
            }
        })

        return {success:true,message:"Shot removed from collection"}
    } catch (error) {
        console.error('Error removing shot from the collection', error)
        return {error:"Error removing shot from the collection"}
    }
}

export const moveShotToAnotherCollection = async (uploadId:string, fromCollectionId:string,toCollectionId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}
    
    const existingSave = await prisma.save.findUnique({
        where:{
            userId_uploadId:{
                userId:session.user.id,
                uploadId
            },
            collectionId:fromCollectionId
        }
    })

    if(existingSave){
        try {
            await prisma.save.update({
                where:{
                    id:existingSave.id
                },
                data:{
                    collectionId:toCollectionId
                }
            })

            return {success:true}
        } catch (error) {
            return{error:"Error Moving Shot to Another Collection"}
        }
    } else {
        return {error:"Shot is not in the collection"}
    }
}

export const getCollectionById = async (collectionId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}

    try {
        const collection = await prisma.collection.findUnique({
            where:{
                id:collectionId
            },
            include:{
                saves:{
                    include:{
                        upload:{
                            include:{
                                items:true
                            }
                        }
                    }
                }
            }
        })


        return {success:true, collection}
    } catch (error) {
        console.error('Error retrieving collection', error)
        return {error:"Error retrieving collection"}
    }
}

export const isShotSavedByUser = async (uploadId:string) => {
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User is not authenticated"}


    try {
        const save = await prisma.save.findUnique({
            where:{
                userId_uploadId:{
                    userId:session.user.id,
                    uploadId
                }
            }
        })
        
        return {success:true, isSaved:!!save}
    } catch (error) {
        console.error('Error checking if shot is saved', error)
        return {error:"Error checking if shot is saved"}
    }
}