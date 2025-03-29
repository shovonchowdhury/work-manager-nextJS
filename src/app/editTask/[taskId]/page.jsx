"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ Use next/navigation for App Router
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loader from "@/app/components/Loader";

export default function EditTask({ params }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const { taskId } = params;

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
  });
  const [addTaskState, setAddTaskState] = useState("Update Task");
  const [loading, setLoading] = useState(true);

  // Fetch task details using async/await
  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/tasks/${taskId}`
        );
        console.log(response.data);
        setTask(response.data.task);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch task details.", {
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  // Update task handler with async/await
  const updateTaskHandler = async (e) => {
    e.preventDefault();
    try {
      setAddTaskState("Updating...");
      await axios.put(`/api/tasks/${taskId}`, task);
      toast.success("Task updated successfully!", { position: "top-center" });
      router.push("/showTask"); // ✅ Navigate after success
    } catch (err) {
      console.error(err);
      toast.error("Task not updated!", { position: "top-center" });
    } finally {
      setAddTaskState("Update Task");
    }
  };

  const clearForm = () => {
    setTask({ title: "", content: "", status: "" });
  };

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Task</h2>
      <form onSubmit={updateTaskHandler} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            value={task.title}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Content</label>
          <textarea
            placeholder="Enter task details"
            rows="4"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(e) => setTask({ ...task, content: e.target.value })}
            value={task.content}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Status</label>
          <select
            className="border rounded-lg px-3 py-2 bg-gray-100"
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            value={task.status}
          >
            <option value="" disabled>
              ---Select Status---
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 sm:justify-center">
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-950 cursor-pointer"
          >
            {addTaskState}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 cursor-pointer"
            onClick={clearForm}
          >
            Clear Data
          </button>
        </div>
      </form>
    </div>
  );
}
