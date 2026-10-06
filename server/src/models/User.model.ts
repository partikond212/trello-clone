import mongoose, { Schema } from "mongoose";

 const UserSchema = new Schema({
    name:{type:String,required:true},
    passwordHash:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    avatar:{type:String,required:false}

 })


export const User = mongoose.model('User',UserSchema)