import { ApiError } from "./ApiError.js"

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