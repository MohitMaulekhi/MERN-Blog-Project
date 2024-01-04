import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))


// Configuration
app.use(express.json({  //limiting json data
    limit:"256kb"
}))
app.use(express.urlencoded({   // making enconding standard and limiting it
    extended:true,
    limit: "256kb"
}))
app.use(express.static("public")) // serving public folder as static for app
app.use(cookieParser()) // for using secure cookies



//routes

import userRouter from "./routes/user.routes.js"

//routes declaration
app.use("/api/v1/user",userRouter)

export {app};