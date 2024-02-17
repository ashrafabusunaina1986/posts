import jwt from 'jsonwebtoken'

export const getToken= req=>{
    try {
        const token=req.cookies.get('token')?.value || ''

        const decode= jwt.verify(token,process.env.DATA_TOKEN)
        return decode.id
    } catch (error) {
        throw new Error(error.message)
    }
}