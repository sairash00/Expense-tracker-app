import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required: true,
    },
    to:{
        type:String,
        required: true
    },
    purpose:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Expense = mongoose.model("Expense", expenseSchema)
