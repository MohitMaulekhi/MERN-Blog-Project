import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// User Schema for mongoDB
const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type: String,
            required: true,
            trim: true,
        },
        avatar:{
            type: String
        },
        avatarName:{
            type: String
        },
        blogs:[
            {
                type:Schema.Types.ObjectId,
                ref:"Blog"
            }
        ],
        password:{
            type:String,
            required: [true,"Password is required"]
        },
        refreshToken:{
            type:String
        }
    }
,{timestamps:true})

// Encrypting password before saving it into database.
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,2)
    next();
})

// Checking the password passed as an argument with the password saved in database.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

// Genearing Access Token for user login and user authentication.
userSchema.methods.generateAcessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username: this.username,
        fullName: this.fullName 
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

// Genearing Refresh Token for user login and user authentication.
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User",userSchema)