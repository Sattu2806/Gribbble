"use server"
import prisma from "@/app/prismadb"
import {auth} from "@/auth"

export const toggleLikeShot = async(shotId:string) => {
    const session = await auth()
    if(!session?.user || !session?.user.id || !shotId) return

    const existingShot = await prisma.upload.findUnique({
        where:{
            id:shotId
        }
    })

    if(!existingShot) return

    const existingLike = await prisma.like.findUnique({
        where:{
            uploadId_userId:{
                uploadId:shotId,
                userId:session.user.id
            }
        }
    })

    if(!existingLike){
        try {
            await prisma.like.create({
                data:{
                    uploadId:shotId,
                    userId:session.user.id
                }
            })
        } catch (error) {
            console.log("Error", error)
            throw new Error("Could not liked the shot")
        }
    }else{
        try {
            await prisma.like.delete({
                where:{
                    id:existingLike.id
                }
            })
        } catch (error) {
            throw new Error("Could not un-liked the shot")
        }
    }
}


export const hasLikedShot = async (shotId:string) => {
    const session = await auth()
    if(!session?.user || !session?.user.id || !shotId) return

    const existingLike = await prisma.like.findUnique({
        where:{
            uploadId_userId:{
                uploadId:shotId,
                userId:session.user.id
            }
        }
    })

    return existingLike !== null
}