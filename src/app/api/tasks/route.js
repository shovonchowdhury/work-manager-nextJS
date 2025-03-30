import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

await connectDB();


export async function GET() {
  try {
    // Fetch all tasks
    const tasks = await Task.find().sort({ addedDate: 1 });

    return NextResponse.json({ success: true, tasks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
    try {
      const { title, content, status, deadline} = await req.json();
  
      // Validate incoming data
      if (!title || !content || !deadline) {
        return NextResponse.json(
          { success: false, error: "Title, content and deadline are required" },
          { status: 400 }
        );
      }

      const token = req.cookies.get("token")?.value;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      const userId=decoded.id;


  
      // Create new task
      const newTask = await Task.create({ title, content,status,deadline:new Date(deadline), userId});
  
      return NextResponse.json(
        { success: true, task: newTask },
        { status: 201 }
      );
    } catch (err) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }