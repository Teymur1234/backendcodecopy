import express from "express"

const userRouter=express.Router()

import { login, logout, signup } from "../controller/auth.controller.js"

userRouter.use("/login",login)
userRouter.use("/logout",logout)
userRouter.use("/signup",signup)

export default userRouter