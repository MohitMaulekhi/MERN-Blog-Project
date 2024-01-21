import { Router } from "express";
import {createBlog, getBlog,updateBlog,deleteBlog} from "../contollers/blog.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/create").post(
    upload.single('blogImg'),verifyJWT,createBlog
)

router.route("/get/:id").get(getBlog)

router.route("/update/:id").post(
    upload.single('blogImg'),verifyJWT,updateBlog
)

router.route("/delete/:id").get(verifyJWT,deleteBlog)


export default router;