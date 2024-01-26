import dotenv from "dotenv"
import connectDB from "./db/index.db.js";
import { app } from "./app.js";


// Configuring environmental variables
dotenv.config({
    path: './.env'
})


// Connecting Databse
connectDB()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Server is running on at Port: ${port}`)
        })
        app.on('error', (error) => {
            console.log("ERRR", error);
            throw error;
        })

    })
    .catch((err) => {
        console.log("MONGODB connection failed !!! in index.js", err)
    })