import { Router } from "express";
import { changeCurrentPassword, updateAccountDetails, updateUserAvatar } from "../contollers/updateUser.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = new Router()

router.route("/password").patch(verifyJWT, changeCurrentPassword)
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/details").patch(verifyJWT, updateAccountDetails)


export default router;