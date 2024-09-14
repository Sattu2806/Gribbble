"use server"
import prisma from "@/app/prismadb"  // Adjust the import path if necessary
import { auth } from "@/auth"


export const addComment = async (shotId:string,content:string)=>{
    const session = await auth()
    if(!session?.user || !session.user.id) return {error:"User not authenticated"}
    if(!shotId || !content.trim()) return {error:"Invalid Input"}

    const Shot = await prisma.upload.findUnique({
        where:{
            id:shotId
        }
    })
    
    if(!Shot) return {error:"Shot not found"}

    try {
        const comment = await prisma.comment.create({
            data:{
                content,
                userId:session.user.id,
                uploadId:shotId
            }
        })
    } catch (error) {
        console.error("Error adding comment",error)
        return {error:"Error adding comment"}
    }
}

export const getAllCommentByShot = async(shotId:string) => {
    if(!shotId) return {error:"Invalid Input"}

    try {
        const comments = await prisma.comment.findMany({
            where:{
                uploadId:shotId
            },
            include:{
                user:true
            },
            orderBy:{
                createdAt:"desc"
            }
        })

        return {success:true, comments}
    } catch (error) {
        console.error("Error retrieving the comments", error)
        return {error:"Error retrieving the comments"}
    }
}