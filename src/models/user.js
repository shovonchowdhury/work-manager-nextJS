import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name:String,
    email:{
        type:String,
        required: [true,"Email Required!!"],
        unique: true
    },
    password:{
        type: String,
        required:[true,"Password Required !!"]
    },
    about: String,
    profilURL: String
})

export const User = mongoose.models.users || mongoose.model("users",UserSchema);