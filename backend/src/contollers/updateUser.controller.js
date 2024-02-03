import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteOnCloudinary } from "../utils/cloudinaryDelete.js"

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    const isPass = await user.isPasswordCorrect(oldPassword)
    if (!isPass) {
        throw new ApiError(400, "Invalid Old Password")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: 0 })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed Successfully"))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body
    if (!fullName && !email) {
        throw new ApiError(400, "At least one field is required")
    }
    const existedUser = await User.findOne({email})

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    if(!fullName || !email){
        const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
            email
        }
    },
        { new: true }).select("-password")
        return res.status(200)
        .json(new ApiResponse(200, user, "Account updated successfully"))
    }
    if(!fullName){
        const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            email
        }
    },
        { new: true }).select("-password")
        return res.status(200)
        .json(new ApiResponse(200, user, "Account updated successfully"))
    }
    if(!email){
        const user = await User.findByIdAndUpdate(req.user?._id, {
        $set: {
            fullName,
        }
    },
        { new: true }).select("-password")
        return res.status(200)
        .json(new ApiResponse(200, user, "Account updated successfully"))
    }
    else{
        throw new ApiError(410, "Something went wrong")
    }
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    
    const avatarLocalPath = req.file?.path
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on Avatar")
    }
    const {avatarName}  = await User.findById(req.user._id)

    await deleteOnCloudinary(avatarName)

    const user = await User.findByIdAndUpdate(req.user._id,
        { 
            avatar: avatar.url,
            avatarName:avatar.public_id
        },
        { new: true }).select("-password")
    return res.status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"))
})


export {
    changeCurrentPassword,
    updateAccountDetails,
    updateUserAvatar
}