import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app=express()

dotenv.config()

import userRouter from "./routes/auth.routes.js"

const PORT=process.env.PORT
const MONGODB_URL=process.env.MONGODB_URL

app.use("/auth", userRouter)

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(4000,(request,response)=>{
        console.log(`App listen port : ${PORT}`);
    })
    console.log("Database connect succesfully");
}).catch((error)=>{
    console.log(`There are error in connection ${error}`);
})