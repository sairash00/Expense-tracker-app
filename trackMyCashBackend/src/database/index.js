
import mongoose from 'mongoose';


const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(
            //mongodb connection string
        )
        console.log("mongodb database connection successful")
    }
catch(error){
    console.log("error connection to mongodb"+error)
}}

export default connectDB;
