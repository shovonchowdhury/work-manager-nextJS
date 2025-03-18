import mongoose from "mongoose";

export async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);

        console.log("Connected to Database.")
    }
    catch(err){
        console.log(err);
    }
}