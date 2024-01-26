import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

// Configuring cloudinary database
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_API_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Utility to upload a file saved in ../public/temp folder to cloudinary database.
// Unlinks the saved(delete from ../public/temp) file. 
const uploadOnCloudinary = async (localfilepath)=>{
    try {
        if(!localfilepath) return null;
        const response = await cloudinary.uploader.upload(localfilepath,{
            resource_type:'auto'
        })
        fs.unlinkSync(localfilepath)
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null;
    }
}
export {uploadOnCloudinary};