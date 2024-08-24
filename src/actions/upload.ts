"use server"
import prisma from "@/app/prismadb"
import {auth} from "@/auth"
import { UploadDataType } from "@/hooks/use-upload-data"

interface ShotType{
    title:string
    entries:UploadDataType[]
    categoryId:string
    tagsArray:string[]
}

export const makeUpload = async (values:ShotType) => {
    const session = await auth()
    if(!session?.user){
        return
    }
    const userId = session.user.id

    if(!userId){
        return
    }

    const {categoryId,entries,tagsArray,title} = values

    if(title && entries){
        try {
            const newShot = await prisma.upload.create({
                data:{
                    title,
                    items:{
                        create:entries.map((entry:UploadDataType)=> ({
                            type:entry.type,
                            content:entry.content ?? '',
                            extra1:entry.extra1,
                            extra2:entry.extra2
                        }))
                    },
                    categoryId,
                    tags:tagsArray,
                    userId
                }
            })

            // return {sucess: true,error:null}
        } catch (error) {
            // return {sucess:false,error:error}
            console.log(error)
        }
    }
}


export const getUploadDataByInifiteQuery = async (take:string,lastCursor:string,categoryId:string | null,queryTag:string | null) => {
    try {
        const shots = await prisma.upload.findMany({
            where:{
                ...(categoryId && {categoryId: categoryId}),
                ...(queryTag && {tags : {has:queryTag}})
            },
            include:{
                items:true,
                user:{
                    select:{
                        image:true,
                        name:true
                    }
                }
            },
            take:take ? parseInt(take as string) : 10,
            ...(lastCursor && {
                skip:1,
                cursor:{
                    id:lastCursor as string
                }
            }),
            orderBy:{
                createdAt:'desc'
            }
        })

        if(shots.length === 0 ){
            const data = {
                data: shots,
                metaData:{
                    lastCursor:null,
                    hasNextPage:false
                }
            }

            return {
                success:true,
                data:JSON.parse(JSON.stringify(data))
            }
        }

        const lastShot = shots[shots.length - 1]
        const cursor = lastShot.id

        const nextpage = await prisma.upload.findMany({
            take:take ? parseInt(take as string) : 10,
            skip:1,
            cursor:{
                id:cursor
            }
        })

        const data = {
            data: shots,
            metaData:{
                lastCursor:cursor,
                hasNextPage:nextpage.length > 0
            }
        }

        return {
            success:true,
            data:JSON.parse(JSON.stringify(data))
        }
    } catch (error) {
        console.error("Error fetchng the data", error)
        return {success:false,data:[],metaData:{
            lastCursor:null,
            hasNextPage:false
        },error:"Error fetching the data"}
    }
}


export const getUploadDataByInifiteQuerySearch = async (take:string,lastCursor:string,searchQuery?:string) => {
    try {
        const shots = await prisma.upload.findMany({
            where:{
                title:{
                    contains:searchQuery,
                    mode:"insensitive"
                }
            },
            include:{
                items:true
            },
            take:take ? parseInt(take as string) : 10,
            ...(lastCursor && {
                skip:1,
                cursor:{
                    id:lastCursor as string
                }
            }),
            orderBy:{
                createdAt:'asc'
            }
        })

        if(shots.length === 0 ){
            const data = {
                data: shots,
                metaData:{
                    lastCursor:null,
                    hasNextPage:false
                }
            }

            return {
                success:true,
                data:JSON.parse(JSON.stringify(data))
            }
        }

        const lastShot = shots[shots.length - 1]
        const cursor = lastShot.id

        const nextpage = await prisma.upload.findMany({
            take:take ? parseInt(take as string) : 10,
            skip:1,
            cursor:{
                id:cursor
            }
        })

        const data = {
            data: shots,
            metaData:{
                lastCursor:cursor,
                hasNextPage:nextpage.length > 0
            }
        }

        return {
            success:true,
            data:JSON.parse(JSON.stringify(data))
        }
    } catch (error) {
        console.error("Error fetchng the data", error)
        return {success:false,data:[],metaData:{
            lastCursor:null,
            hasNextPage:false
        },error:"Error fetching the data"}
    }
}