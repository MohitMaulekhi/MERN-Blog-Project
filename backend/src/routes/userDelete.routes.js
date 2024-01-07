import { Router } from "express";
import { deleteUser } from "../contollers/deleteUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

router.route("/").post(verifyJWT, deleteUser)

export default router