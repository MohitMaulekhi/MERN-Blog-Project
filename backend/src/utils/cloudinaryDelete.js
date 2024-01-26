import {v2 as cloudinary} from 'cloudinary';

// Configuring cloudinary database.
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_API_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Deleting the file using the name from cloudinary database.
const deleteOnCloudinary = (name)=>{ 
    cloudinary.uploader.destroy(name)
}
export {deleteOnCloudinary};