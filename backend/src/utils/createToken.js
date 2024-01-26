import { ApiError } from "./ApiError.js"
import { User } from "../models/user.model.js";

// This function will create access and refresh token using user's ID and save the refresh token in user's collection.
const generateAcessAndRefreshToken = async(userID)=>{
    try {
        const user = await User.findById(userID);
        const refreshToken = user.generateRefreshToken()
        const accessToken = user.generateAcessToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while genearting tokens")
    }
}

export {generateAcessAndRefreshToken}