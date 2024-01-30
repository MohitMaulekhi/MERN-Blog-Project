import { Router } from "express";
import {createBlog, getBlog,updateBlog,deleteBlog,getAllBlogs,getGlobal} from "../contollers/blog.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

// router to create blog and save data in database.
router.route("/create").post(
    upload.single('blogImg'),verifyJWT,createBlog
)

// router to send a single blog using id. 
router.route("/get/:id").get(getBlog)

// router to send response of all the blogs of user
router.route("/getAllBlogs/").get(verifyJWT,getAllBlogs)

// roter to send all the blogs except user's blogs
router.route("/getGlobal/page/:pagenumber").get(verifyJWT,getGlobal)

// router to update blog in database.
router.route("/update/:id").post(
    upload.single('blogImg'),verifyJWT,updateBlog
)

// router to delete blogs from database.
router.route("/delete/:id").get(verifyJWT,deleteBlog)

export default router;