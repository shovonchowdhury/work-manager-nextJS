import { Task } from "@/models/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
    try {
      const { taskId } = await params;  // Get taskId from URL params
  
      // Validate if taskId is provided
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return NextResponse.json(
          { success: false, error: "Invalid taskId" },
          { status: 400 }
        );
      }
  
      // Find the task by taskId
      const task = await Task.findById(taskId);
  
      // If task not found
      if (!task) {
        return NextResponse.json(
          { success: false, error: "Task not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json({ success: true, task }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }

  export async function PUT(req, { params }) {
    try {
      const { taskId } = await params;  // Extract taskId from the URL params
      const data = await req.json(); // Get the updated data from the request body
  
      // Validate if taskId is valid
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return NextResponse.json(
          { success: false, error: "Invalid taskId" },
          { status: 400 }
        );
      }
  
      // Validate incoming data (optional, adjust based on fields you want)
      if (!data || Object.keys(data).length === 0) {
        return NextResponse.json(
          { success: false, error: "No data provided for update" },
          { status: 400 }
        );
      }
  
  
      // Update the task by its ID and return the updated task
      const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true });
  
      // If task not found
      if (!updatedTask) {
        return NextResponse.json(
          { success: false, error: "Task not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "Task updated successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }


  export async function DELETE(req, { params }) {
    try {
      const { taskId } = await params;  // Get taskId from URL params
  
      // Validate if taskId is valid
      if (!mongoose.Types.ObjectId.isValid(taskId)) {
        return NextResponse.json(
          { success: false, error: "Invalid taskId" },
          { status: 400 }
        );
      }
  
  
      // Delete the task by taskId
      const deletedTask = await Task.findByIdAndDelete(taskId);
  
      // If task not found
      if (!deletedTask) {
        return NextResponse.json(
          { success: false, error: "Task not found" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(
        { success: true, message: "Task deleted successfully" },
        { status: 200 }
      );
    } catch (err) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
  }
