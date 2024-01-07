import mongoose,{Schema} from "mongoose"

const blogSchema = new Schema(
    {
        heading:{
            type: String,
            required: true,
            index:true
        },
        img:{
            type:String
        },
        content:{
            type:String
        }
    }
,{timestamps:true})

export const Blog = mongoose.model("Blog",blogSchema)