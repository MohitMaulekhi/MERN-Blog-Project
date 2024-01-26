import { Router } from "express";
import { loginUser, logoutUser, registerUser, refreshAccessToken, getCurrentUser } from "../contollers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

// router to register user
router.route("/register").post(
    upload.single('avatar'), registerUser
)

// router to allow user to login
router.route("/login").post(loginUser)

// secured routes

// router to logout the user
router.route("/logout").get(verifyJWT, logoutUser)

// router to refresh token of logged in user
router.route("/refresh-token").post(refreshAccessToken)

// router to send response of user data
router.route("/current").get(verifyJWT, getCurrentUser)

export default router;