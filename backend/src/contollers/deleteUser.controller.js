import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { Blog} from "../models/blog.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteOnCloudinary } from "../utils/cloudinaryDelete.js"

const deleteUser = asyncHandler(async (req, res) => {
    const {password} = req.body
    const user = await User.findById(req.user?._id);
    const isPass = await user.isPasswordCorrect(password)
    try {
        if (!isPass) {
            throw new ApiError(400, "Invalid Password")
        }
        try {
    
            const avatarName  = user.avatarName
            const blogArray = user.blogs
    
            for(let i = 0 ; i < blogArray.length ; i++){
                let {blogImgName} =  await Blog.findById(blogArray[i])
                if(blogImgName)
                {
                    await deleteOnCloudinary(blogImgName)
                }
                await Blog.deleteOne({_id: blogArray[i]})
            }
    
            await deleteOnCloudinary(avatarName)
            await User.deleteOne({_id: req.user?._id})
    
        } catch (error) {
            new ApiError(500,"Unable to delete from database")
        }
        
        
    
        const options = {
            httpOnly: true,
            secure: true
        }
        return res
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .status(200)
            .json(new ApiResponse(200, {}, "User delete Successfully"))
    } catch (error) {
        new ApiError(500,"Unable to delete from database")
    }

})

export {deleteUser}