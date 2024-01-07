import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAcessAndRefreshToken } from "../utils/createToken.js"
import jwt from "jsonwebtoken"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exist: username,email
    // check if emaill is connect
    // check for avatar
    // upload them to cloudinary
    //create user object- create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { username, email, fullName, password } = req.body
    // console.log(username, email, fullName, password)

    if (
        [fullName, email, username, password].some((field) => (field?.trim === ""))
    ) {
        throw new ApiError(400, "All field are necessary")
    }

    let atPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");

    if (!(atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1)) {
        throw new ApiError(400, "Entered email is incorrect")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    // console.log("stage 1")

    let avatarLocalPath = req.file?.path;
    // console.log(req)
    // console.log("stage 2")

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    // console.log("stage 3")
    const user = await User.create({
        fullName,
        avatar: avatar?.url || '',
        avatarName: avatar?.public_id || '',
        email,
        password,
        username: username.toLowerCase()
    })
    // console.log("stage 4")
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    // console.log("stage 5")
    if (!createdUser) {
        throw new ApiError("500", "Error while registering User Try again Later")
    }
    // console.log("stage 6")
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered succesfully")
    )


})

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    // find the user
    // password check
    // create access and refresh token
    // send cookie
    // response
    const { email, password } = req.body
    if (!email) {
        throw new ApiError(400, "email is required")
    }

    // console.log("stage 1 completed")

    let atPos = email.indexOf("@");
    let dotPos = email.lastIndexOf(".");

    if (!(atPos > 0 && dotPos > atPos + 1 && dotPos < email.length - 1)) {
        throw new ApiError(400, "Entered email is incorrect")
    }
    // console.log("stage 2 completed")

    const user = await User.findOne({ email })
    // console.log("stage 3 completed")

    if (!user) {
        throw new ApiError(404, "User not found")
    }
    // console.log("stage 4 completed")


    const boolpass = await user.isPasswordCorrect(password)
    if (!boolpass) {
        throw new ApiError(404, "Invalid credentials")
    }
    // console.log("stage 5 completed")


    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(user._id)
    // console.log("stage 6 completed")


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    // console.log("stage 7 completed")


    const options = {
        httpOnly: true,
        secure: true
    }
    // console.log("stage 8 completed")


    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser, accessToken, refreshToken
                },
                "User logged in successfully"
            )
        )


})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }

    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = req.user
    return res
        .status(200)
        .json(new ApiResponse(200, user, "current user fetched successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorised request")
    }
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await User.findById(decodedToken?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }
        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token expired or used")
        }
        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, refreshToken } = await generateAcessAndRefreshToken(user._id)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200,
                    {
                        accessToken,
                        refreshToken
                    },
                    "Access Token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid Token")
    }

})

export {
    getCurrentUser,
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}