import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAcessAndRefreshToken } from "../utils/createToken.js"



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
    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0) {
        avatarLocalPath = req.files.avatar[0].path
    }
    // console.log("stage 2")

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    // console.log("stage 3")
    const user = await User.create({
        fullName,
        avatar: avatar?.url || '',
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

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const boolpass = await user.isPasswordCorrect

    if (!boolpass) {
        throw new ApiError(404, "Invalid credentials")
    }
    const { accessToken, refreshToken } = await generateAcessAndRefreshToken(user._id)

    const loggedInUser = User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

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
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))
})

export { registerUser, loginUser, logoutUser }