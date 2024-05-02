import userModel from "../models/User.js"
import bcrypt from "bcryptjs"
import {generateTokenandSetCookie} from "../utils/generateTokenandSetCookie.js"
export const login=async(request,response)=>{
    try {
        const {username, password}=request.body
        if (!username || !password) {
            return response.status(404).send({error:"Please fill al fields"})
        }
        const user=await userModel.findOne({username})
        if (!user) {
            return response.status(404).response({error:"Username or password is not correct"})
        }
        const isCorrectPassword=await bcrypt.compare(user.password,password)
        if (!isCorrectPassword) {
            return response.status(404).send({error:"Username or password is not correct"})
        }
        generateTokenandSetCookie(user._id,response)
        response.status(200).send({message:"You succesfully login"})
    } catch (error) {
        console.log(`There is error occured in login : ${error.message}`);
        response.status(404).send({error:error.message})
    }
}
export const logout=async(request,response)=>{
    try {
        response.cookie("jwt","")
        response.status(200).send({message:"Logget out succesfully"})
    } catch (error) {
        console.log(`There is error occured in logout : ${error.message}`);
        response.status(404).send({error:error.message})
    }
}
export const signup=async(request,response)=>{
    try {
        const {username, password,confirmPassword,fullname}=request.body
        if (!username || !password || !confirmPassword || !fullname) {
            return response.status(404).send({error:"Please fill all fields"})
        }
        const user=await userModel.findOne({username})
        if (user) {
            return response.status(404).send({error:"This username is used before"})
        }
        const salt=bcrypt.genSalt(10)
        const hashedPassword=bcrypt.hash(password,salt)
        const newUser=await userModel.create(username,hashedPassword)
        response.status(200).send(newUser)
    } catch (error) {
        console.log(`There is error occured in signup : ${error.message}`);
        response.status(404).send({error:error.message})
    }
}