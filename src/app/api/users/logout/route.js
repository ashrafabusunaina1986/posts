import { NextResponse } from "next/server"

export const GET =async req=>{
    try {
        const response=NextResponse.json({
            success:true,
            message:'Logout successfully'
        },{status:201})
        response.cookies.set('token','',{
            httpOnly:true,
            expires:new Date(0)
        })
        
        return response
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }
}