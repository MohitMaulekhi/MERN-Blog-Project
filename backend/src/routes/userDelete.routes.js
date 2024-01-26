import { Router } from "express";
import { deleteUser } from "../contollers/deleteUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router()

// router to delete user from database. 
router.route("/").post(verifyJWT, deleteUser)

export default router