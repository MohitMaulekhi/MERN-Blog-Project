import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exist: username,email
    // check for avatar
    // upload them to cloudinary
    //create user object- create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const {username,email,fullName,password} = req.body
    console.log(username,email,fullName,password)
    if(
        [fullName,email,username,password].some((field)=>(field?.trim === ""))
    ){
        throw new ApiError(400,"All field are necessary")
    }
    const existedUser = await User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    console.log("stage 1")
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }
    console.log("stage 2")
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    console.log("stage 3")
    const user = await User.create({
        fullName,
        avatar: avatar?.url || '',
        email,
        password,
        username: username.toLowerCase()
    })
    console.log("stage 4")
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    console.log("stage 5")
    if(!createdUser){
        throw new ApiError("500","Error while registering User Try again Later")
    }
    console.log("stage 6")
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered succesfully")
    )

    
})

export {registerUser}