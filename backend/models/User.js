import mongoose from "mongoose";

const User=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    configPassword:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    }
},{timestamps:true})

const userModel=mongoose.model("user",User)
export default userModel