import { NextResponse } from "next/server"
import { getToken } from "../../../../../helper/getToken"
import Users from "../../../../../models/users"

export const GET = async req => {
    try {

        const userId = await getToken(req)

        const user = await Users.findOne({ _id: userId }).select('-password')

        return NextResponse.json({
            message: "User found",
            success: true,
            user: user
        }, { status: 201 })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 400 })
    }
}