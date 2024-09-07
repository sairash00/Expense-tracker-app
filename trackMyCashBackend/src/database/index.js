
import mongoose from 'mongoose';


const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(
            process.env.DB_URI
        )
        console.log("mongodb database connection successful")
    }
catch(error){
    console.log("error connection to mongodb"+error)
}}

export default connectDB;
