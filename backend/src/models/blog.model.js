import mongoose,{Schema} from "mongoose"

const blogSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
            index:true
        },
        blogImg:{
            type:String
        },
        blogImgName:{
            type:String
        },
        content:{
            type:String,
            required:true
        }
    }
,{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)