import { NextResponse } from 'next/server'
import connect from '../../../../../db_config/db'
import Users from '../../../../../models/users'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export const POST =async req=>{
    try {
        const {email,password}=await req.json()
        
        const user=await Users.findOne({email})
        if(!user) return NextResponse.json({success:false,message:'Email not exist'},{status:400})
    
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword)return NextResponse.json({success:false,message:'password not valid'},{status:400})

        const dataToken={
            id:user._id,
            email: user.email,
        }
    
        const token=await jwt.sign(dataToken,process.env.DATA_TOKEN,{expiresIn:'1h'})
            

        const response=NextResponse.json({
            success:true,
            message:'login successfully',
            user:user,
            token:token
        },{status:201})

        response.cookies.set('token',token,{
            httpOnly:true
        })

        
        return response
    } catch (error) {
        return NextResponse.json({success:false,message:error.message},{status:500})
    }
}
