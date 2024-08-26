"use server"
import prisma from "@/app/prismadb"
import {auth} from "@/auth"

export const toggleFollowUser = async (userIdToggle:string) => {
    const session = await auth()
    if (!session || !session.user || !session.user.id) return {error: "user not authenticated"}
    if(!userIdToggle) return {error: "Invalid user to foollow"}
    if(userIdToggle === session.user.id) return {error:"You cannot follow yourself"}

    const followerId = session.user.id

    const existingFollow = await prisma.following.findUnique({
        where:{
            followerId_followingId:{
                followerId,
                followingId:userIdToggle
            }
        }
    })

    try {
        if(existingFollow){
            await prisma.following.delete({
                where:{
                    followerId_followingId:{
                        followerId,
                        followingId:userIdToggle
                    }
                }
            })
            return {success:true, message:"Unfollowed author"}
        }
        else{
            await prisma.following.create({
                data:{
                    followerId,
                    followingId:userIdToggle
                }
            })
            return {success:true, message:"Successfully followed author"}
        }
        
    } catch (error) {
        console.log("Error toggling follow status",error)
        return {error:"Error toggling follow status"}
    }
}


export const isFollowing = async(userIdToCheck:string) => {
    const session = await auth()
    if (!session || !session.user || !session.user.id) return {error: "user not authenticated"}
    if(!userIdToCheck) return {error: "Invalid user to foollow"}
    if(userIdToCheck === session.user.id) return {error:"You cannot follow yourself"}

    const followerId = session.user.id

    try {
        const existingFollow = await prisma.following.findUnique({
            where:{
                followerId_followingId:{
                    followerId,
                    followingId:userIdToCheck
                }
            }
        })
        
        if(existingFollow){
            return{success:true,isFollowing:true}
        }else {
            return{success:true,isFollowing:false}
        }
    } catch (error) {
        console.error("Error checking the follow status",error)
        return {error:"Error checking the follow status"}
    }


    
}