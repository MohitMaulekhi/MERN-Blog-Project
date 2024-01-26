import multer from "multer";

// Middleware to get file from http request.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")  // Saving the file in ./public/temp folder
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
export const upload = multer({ 
    storage, 
})