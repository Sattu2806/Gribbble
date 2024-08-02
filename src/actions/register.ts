"use server"
import prisma from "@/app/prismadb"
import { registerSchema } from "@/Schema/RegisterSchema"
import {z}from "zod"
import bcrypt from "bcryptjs"

export const registerUser = async(values:z.infer<typeof registerSchema>) => {
    const validateUserData = registerSchema.safeParse(values)
    
    if(!validateUserData.success){
        return {error: "Invalide type data"}
    }

    const {email,name,password} = validateUserData.data

    const Checkuser = await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(Checkuser){
        return {error: "User already exist with this data"}
    } else {
        const hashedPassword = await bcrypt.hash(password,10)
        try {
            await prisma.user.create({
                data:{
                    email,
                    password:hashedPassword,
                    name
                }
            })
            return {message: "User created successfully"}
        } catch (error) {
            throw error
        }
    }

}

