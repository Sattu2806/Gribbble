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
            }
        })

        return shot
    } catch (error) {
        return null
    }
}