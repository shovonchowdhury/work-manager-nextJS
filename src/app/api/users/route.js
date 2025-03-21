import bcrypt from "bcryptjs";
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
    const { name, email, password, about, profileURL } = await req.json();
  
    try {
      // Fetch the salt rounds from the environment variable
      const saltRounds = process.env.BCRYPT_SALT_ROUNDS;
  
      // Encrypt the password using bcrypt with the salt rounds from the .env file
      const salt = await bcrypt.genSalt(parseInt(saltRounds)); // Use async bcrypt.genSalt
      const hashedPassword =  bcrypt.hashSync(password, salt); // Use async bcrypt.hash
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword, // Store the hashed password
        about,
        profileURL,
      });
  
      const savedUser = await newUser.save();
  
      return NextResponse.json(
        {
          success: true,
          message: "User created successfully!",
        },
        { status: 201 }
      );
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { success: false, error: err.message || "Failed to create user" },
        { status: 500 }
      );
    }
  }