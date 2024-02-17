import { NextResponse } from 'next/server'
import connect from '../../../../db_config/db'
import Posts from '../../../../models/post'


connect()

export const POST = async req => {
    try {
        const { subject, text } = await req.json()
        const newpost = await Posts.create({ subject, text })
        const info = await Posts.find()
        if (info) return NextResponse.json({ success: true, message: 'created note' }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 400 })
    }
}

export const GET = async req => {
    try {
        const infos=await Posts.find()
        if(infos) return NextResponse.json({success:true,info:infos.reverse()},{status:201})
    } catch (error) {
        return NextResponse.json({ success: false, message: 'not created note' },
            { status: 400 })
    }
}