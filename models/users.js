import {Schema,model,models} from 'mongoose'

const usersSchema=new Schema({
    name:{
        type:String,
        required:[true,'provide a name'],
    },
    email:{
        type:String,
        required:[true,'provide an email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'provide a password'],
    },
})

const Users=models.Users || model('Users',usersSchema)

export default Users