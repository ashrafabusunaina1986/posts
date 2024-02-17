import { NextResponse } from "next/server"

export const GET = async req => {
    try {
        const token = req.cookies.get('token')?.value || ''
        return NextResponse.json({token}, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message },{status:500})
    }
}