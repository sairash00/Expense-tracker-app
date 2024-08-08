import mongoose from 'mongoose';


const userSchema  = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    expenses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Expense"
        }
    ],
    incomes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Income"
        }
    ]

},{timestamps:true})

export const User = mongoose.model("User",userSchema);