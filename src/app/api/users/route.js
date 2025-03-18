import { connectDB } from "@/helper/db";
import { User } from "@/models/user";
import { NextResponse } from "next/server"

await connectDB();
export async function GET() {
    try {
      
      const users = await User.find(); // fetch all users
  
      return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: "Failed to get users" },
        { status: 500 }
      );
    }
  }

export async function POST(req) {

    const {name, email, password, about, profileURL}= await req.json();

    const newUser= new User({
        name,
        email,
        password,
        about,
        profileURL
    })
    
   try{
        const savedUser = await newUser.save();
        return NextResponse.json({
            success : true, message:"User created Successfully!!"
        }, {status:201})

   }
   catch(err){
        return NextResponse.json(
            {success:false, error: "Failed to creat User"},
            {status:500}
        )
   }

}