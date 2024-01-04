import { Router } from "express";
import { registerUser } from "../contollers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(
    upload.fields([{name:"avatar",maxcount:1}]),registerUser
    )

export default router;