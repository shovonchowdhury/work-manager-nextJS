import { connectDB } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

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
      const { title, content, userId } = await req.json();
  
      // Validate incoming data
      if (!title || !content || !userId) {
        return NextResponse.json(
          { success: false, error: "Title, content, and userId are required" },
          { status: 400 }
        );
      }
  
      // Create new task
      const newTask = await Task.create({ title, content, userId });
  
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