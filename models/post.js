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
})

const Posts=models.P || model('P',postSchema)
export default Posts