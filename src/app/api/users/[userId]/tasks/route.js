import { Task } from "@/models/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    try {
      const { userId } = params;  // Extract userId from URL params
  
      // Validate if userId is valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { success: false, error: "Invalid userId" },
          { status: 400 }
        );
      }
  
      // Find tasks by userId
      const tasks = await Task.find({ userId: userId }).sort({ addedDate: 1 });
  
      // If no tasks found
      if (tasks.length === 0) {
        return NextResponse.json(
          { success: false, message: "No tasks found for this user" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, tasks },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }