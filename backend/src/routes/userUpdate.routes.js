import { Router } from "express";
import { changeCurrentPassword, updateAccountDetails, updateUserAvatar } from "../contollers/updateUser.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = new Router()

// router to change password of user.
router.route("/password").patch(verifyJWT, changeCurrentPassword)

// router to change avatar of user and updating avatar and avatarImg in database.
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)

// router to change email and fullName of user and updating email and fullName in database.
router.route("/details").patch(verifyJWT, updateAccountDetails)


export default router;