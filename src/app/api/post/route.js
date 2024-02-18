import { NextResponse } from 'next/server'
import connect from '../../../../db_config/db'
import Posts from '../../../../models/post'
import { getToken } from '../../../../helper/getToken'
import Users from '../../../../models/users'


connect()

export const POST = async req => {
    try {
        const { subject, text } = await req.json()
        const userId = await getToken(req)
        const user = await Users.findOne({ _id: userId })
        // return NextResponse.json({user:userId},{status:200})
        if (user) {
            const newpost = await Posts.create({ subject, text ,user:user.email})
            const info = await Posts.find()
            if (info) return NextResponse.json({ success: true, message: 'created note' }, { status: 201 })

        }else{
            return NextResponse.json({ success: false, message: 'user not exit' }, { status: 400 })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 })
    }
}

export const GET = async req => {
    try {
        const userId = await getToken(req)
        const user = await Users.findOne({ _id: userId })
        const infos = await Posts.find({user:user.email})
        if (infos) return NextResponse.json({ success: true, info: infos.reverse() }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'not created note' },
            { status: 400 })
    }
}