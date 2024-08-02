import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {apiAuthroutes,authroutes,default_route,publicRoutes} from "@/routes"
 
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const {nextUrl} = req
    const isLoggedIn = !!req.auth

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthroutes)

    const isPublicroute = publicRoutes.some((route) => {
        if(route.endsWith('/*')){
            return nextUrl.pathname.startsWith(route.slice(0, -2))
        }
        return route === nextUrl.pathname
    })
    
    const isAuthroute = authroutes.includes(nextUrl.pathname)

    if(isApiAuthRoute){
        return
    }

    if(isAuthroute){
        if(isLoggedIn){
            return Response.redirect(new URL(default_route,nextUrl))
        }

        return
    }

    if(!isLoggedIn && !isPublicroute){
        return Response.redirect(new URL('/login',nextUrl))
    }

    return
    
})


export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};