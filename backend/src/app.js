import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(cors({
    origin:[process.env.CORS_ORIGIN],
    methods:["GET","PUT","POST","DELETE"],
    credentials:true
}));


// Configuration
app.use(express.json())
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public")) // serving public folder as static for app
app.use(cookieParser()) // for using secure cookies


//routes
import userRouter from "./routes/user.routes.js"
import userUpdateRouter from "./routes/userUpdate.routes.js"
import userDeleteRouter from "./routes/userDelete.routes.js"
import blogRouter from "./routes/blog.routes.js"

//routes declaration
app.use("/api/v1/user", userRouter)
app.use("/api/v1/user/update", userUpdateRouter)
app.use("/api/v1/user/delete", userDeleteRouter)
app.use("/api/v1/blog", blogRouter)


export { app };