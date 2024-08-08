import {v2} from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
    cloud_name: "dhvdnmowe", 
    api_key: "331722241962388", 
    api_secret: "XxU6z97k52h7aLRG-d_OxIl2wpg" 
});

const uploadOnCloudinary = async (filepath)=>{
    try {
        
        if(!filepath) return null;
        // upload the file to cloudinary
        const response = await cloudinary.uploader.upload(filepath,{
            resource_type: "auto"
        })
         
        // after successful file upload
        fs.unlink(filepath);
        return response;


    } catch (error) {
        console.log("error uploading file to cloudinary:", error);
        return null
    }
}


export default uploadOnCloudinary