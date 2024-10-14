"use server"
import prisma from "@/app/prismadb"
import {auth} from "@/auth"
import { UploadDataType } from "@/hooks/use-upload-data"

export const getShotById = async (id:string) => {
    try {
        const shot = await prisma.upload.findUnique({
            where:{
                id
            },
            include:{
                items:true,
                user:true
            },
        })

        return shot
    } catch (error) {
        return null
    }
}


export const getShotsByUSer = async () => {
    const session = await auth()

    if(!session?.user.id) return null
    try {
        const moreshots = await prisma.upload.findMany({
            where:{
                userId:session?.user.id
            },
            include:{
                items:true,
                user:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return moreshots
    } catch (error) {
        console.error("Error fetching more shots by user",error)
        return null;
    }
}

export const getAllLikedShotsByUser = async () => {
    const session = await auth()

    if(!session?.user) return []

    const userId = session.user.id

    try {
        const likeShot = await prisma.like.findMany({
            where:{
                userId
            },
            include:{
                upload:{
                    include:{
                        items:true,
                        user:true
                    }
                }
            }
        })

        const likedShots = likeShot.map((like => like.upload) )

        return likedShots
    } catch (error) {
        console.error("Erroe getting liked shot by user",error)
        return []
    }
}

export const getLikeCount = async(shotId:string) => {
    try {
        const  likeCount = await prisma.like.count({
            where:{
                uploadId:shotId
            },
        })

        return likeCount
    } catch (error) {
        return 0
    }
}