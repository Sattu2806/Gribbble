import NextAuth from "next-auth"
import authConfig from "./auth.config"
import prisma from "@/app/prismadb"
import { PrismaAdapter } from "@auth/prisma-adapter"
 
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks:{
    async jwt({token,user}){
      return token
    },
    async session({token,session}){
      if(session.user&& token.sub){
        session.user.id = token.sub
      }
      return session
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})