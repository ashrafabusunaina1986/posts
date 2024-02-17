import mongoose from "mongoose";

const dbConnect=()=>{
    try {
       mongoose.connect(process.env.MONGO)
       console.log('database connected')
    } catch (error) {
        console.log('Error connect:'+error.message)
    }
}

export default dbConnect