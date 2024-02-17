import { NextResponse } from "next/server"

export const middleware=req=>{
    const token=req.cookies.get('token')?.value || ''
    const path=req.nextUrl.pathname ==='/login' || req.nextUrl.pathname==='/signup'
    console.log(`${token}\n${path}\n${req.url}`)
    if(token && path ) {
        return NextResponse.redirect(new URL('/',req.url))
    }
    if( !token && !path){
        return NextResponse.redirect(new URL('/login',req.url))
    }    
}

export const config={
    matcher:[
        '/login',
        '/signup',
        '/post',
        '/profile',
    ]
}