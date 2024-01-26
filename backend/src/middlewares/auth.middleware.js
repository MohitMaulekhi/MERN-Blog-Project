import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


// verifying Access token of user
export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request") // Throwing error if Token not found
        }

        // Decoding Token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        // Finding user after decoding user's Id from Access Token
        const user = await User.findById(decodedToken?._id).select(
            "-password -refreshToken"
        )

        if (!user) {
            throw new ApiError(402, "Invalid Access Token") // Throwing error if user not found
        }

        req.user = user;  // Inserting user's data in http request 
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid access") 
    }
})