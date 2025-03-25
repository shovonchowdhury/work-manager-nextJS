import { connectDB } from '@/helper/db';
import { User } from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req) {
  // Connect to the database
  await connectDB();

  // Extract token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token provided, user not logged in.', user: null }, { status: 401 });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    // Fetch the user data from the database
    const user = await User.findById(decoded.id).select("-password");  
    if (!user) {
      return NextResponse.json({ message: 'User not found.',user: null }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ message: 'User is logged in', user });
  } catch (error) {
    // If verification fails, return an error response
    return NextResponse.json({ message: 'Invalid token, user not logged in.',user : null }, { status: 401 });
  }
}
