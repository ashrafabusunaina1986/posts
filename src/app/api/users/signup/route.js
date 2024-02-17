import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import Users from '../../../../../models/users'
import connect from '../../../../../db_config/db'

connect()

export const POST = async req => {

    try {
        const reqBody = await req.json()
        console.log(await reqBody)

        const { name, email, password } = await reqBody

        const user = await Users.findOne({ email })
        if (user) return NextResponse.json({success:false, message: 'User is already' }, { status: 200 })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newuser = await Users({
            name, email, password: hashedPassword
        })

        const saveuser = newuser.save()

        const data_Token = {
            id: newuser._id,
            email: newuser.email,
        }

        const token = await jwt.sign(data_Token, process.env.DATA_TOKEN, { expiresIn: '1h' })


        
        const response = NextResponse.json({
            success: true,
            message: 'User created successfully',
            user: newuser
        })

        response.cookies.set('token', token, {
            httpOnly: true
        })
        return response 
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}