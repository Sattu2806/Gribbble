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
