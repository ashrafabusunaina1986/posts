import { Schema,model,models } from 'mongoose'

const postSchema=new Schema({
    subject:{
        type:String,
        required:[true,'provide subject']
    },
    text:{
        type:String,
        required:[true,'provide text']
    },
    user:{
        type:String,
        required:[true,'provide user']
    }
})

const Posts=models.Posts || model('Posts',postSchema)
export default Posts