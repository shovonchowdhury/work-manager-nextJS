import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: [true,"Email Required!!"],
        unique: true
    },
    password:{
        type: String,
        required:[true,"Password Required !!"],
        
    },
    about: String,
    profileURL: String,
    
})

export const User = mongoose.models.users || mongoose.model("users",UserSchema);