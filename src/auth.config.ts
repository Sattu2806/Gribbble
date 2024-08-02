import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { loginSchema } from "./Schema/LoginSchema"
import prisma from "@/app/prismadb"
import bcrypt from "bcryptjs"
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    GitHub({
        clientId:process.env.GITHUB_CLIENT_ID,
        clientSecret:process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials){
            const validateData = loginSchema.safeParse(credentials)
            if(!validateData.success) return null
            const {email, password} = validateData.data
            const user = await prisma.user.findUnique({where:{email}})
            if(!user || !user.password){
                return null
            }

            const passwordmatch = await bcrypt.compare(password,user.password)

            if(passwordmatch) return user
            return null
        }
    })
],
} satisfies NextAuthConfig