import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import {Blog} from "../models/blog.model.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { deleteOnCloudinary } from "../utils/cloudinaryDelete.js"

const createBlog = asyncHandler(async (req, res) => {
    const {title,content} = req.body
    
    if (title === "" || content === "")
    {
        throw new ApiError(400, "All field are necessary")
    }

    

    let blogImgLocalPath = req.file?.path;
    let blogImg = ""
    if(blogImgLocalPath){
      blogImg = await uploadOnCloudinary(blogImgLocalPath)
    }


    const blog = await Blog.create({
        title,
        blogImg: blogImg?.url || '',
        blogImgName: blogImg?.public_id || '',
        content
    })

    const createdBlog = await Blog.findById(blog._id)

    if (!createdBlog) {
        throw new ApiError("500", "Error while creating Blog. Try again Later")
    }

    try {
        const user = await User.findByIdAndUpdate(req.user?._id)
        user.blogs.push(createdBlog)
        user.save()
    } catch (error) {
        await Blog.deleteOne({_id: createdBlog._id})
        throw new ApiError("501", "Error while creating Blog. Try again Later")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdBlog, "Blog created succesfully")
    )


})

const getBlog = asyncHandler(async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    if(!blog){
        throw new ApiError(404,"Blog Not Found")
    }
    return res.status(201).json(
        new ApiResponse(201, blog, "Blog fetched succesfully")
    )
})

const updateBlog = asyncHandler(async(req,res)=>{
    const {title,content} = req.body
    const id = req.params.id
    let userAuth = false
    try {
        const user = await User.findById(req.user._id)
        const blogArray = user.blogs
        for(let i = 0 ; i < blogArray.length ; i++){
            if(toString(id) === toString(blogArray[i]._id)){
                userAuth = true
                break
            }
        }

    } catch (error) {
        throw new ApiError(404,"user Not found")
    }

    if (userAuth) {
        const blog = await Blog.findById(id)
    
        if(!blog){
            throw new ApiError(404,"Blog Not Found")
        }
    
    
        if (title === "" || content === "")
        {
            throw new ApiError(400, "All field are necessary")
        }
    
        
        let blogImgLocalPath = req.file?.path;
    
        
        if(blogImgLocalPath){
    
            
            await deleteOnCloudinary(blog.blogImgName)
            let blogImg = await uploadOnCloudinary(blogImgLocalPath)
    
            
            await Blog.findByIdAndUpdate(id, {
                $set: {
                    title,
                    content,
                    blogImg: blogImg?.url || '',
                    blogImgName: blogImg?.public_id || ''
                }
            })
    
        }
        else{
    
            await Blog.findByIdAndUpdate(id, {
            $set: {
                title,
                content
            }
        })
        }
    
        
        const updatedBlog = await Blog.findById(id)
        return res.status(201).json(
            new ApiResponse(200, updatedBlog, "Blog created succesfully")
        )
    } else {
        throw new ApiError(400,"Invalid Access")
    }
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id
    let userAuth = false
    let user = await User.findById(req.user._id)
    try {
        
        const blogArray = user.blogs
        for(let i = 0 ; i < blogArray.length ; i++){
            if(toString(id) === toString(blogArray[i]._id)){
                userAuth = true
                break
            }
        }

    } catch (error) {
        throw new ApiError(404,"user Not found")
    }
    if (userAuth) {
        const {blogImgName} =  await Blog.findById(id)
        if(blogImgName){
            await deleteOnCloudinary(blogImgName)
        }
        await Blog.deleteOne({_id: id})
        user.blogs.pop(id)
        user.save()
        return res.status(201).json(
            new ApiResponse(200, {} , "Blog deleted succesfully"))
    } else {
        throw new ApiError("400", "User Not found")
    }
})

export{
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog
}