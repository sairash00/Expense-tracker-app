import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required: true,
    },
    from:{
        type:String,
        required: true
    },
    source:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Income = mongoose.model("Income", incomeSchema)
