"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa"; // Import edit icon
import Loader from "@/app/components/Loader";

export default function ShowTaskDetails({ params }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const { taskId } = params;

  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
    createdAt: "", // Store task creation date
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;
      try {
        setLoading(true);
        const response = await axios.get(`/api/tasks/${taskId}`);
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

  if (loading) return <Loader />;
  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white px-8 pb-8 pt-6 rounded-2xl shadow-xl mt-10 border border-gray-200 transition-all duration-300 animate-fade-in">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Task Details
      </h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Title:</h3>
          <p className="text-lg text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            {task.title}
          </p>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Content:</h3>
          <p className="text-lg text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            {task.content}
          </p>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Status:</h3>
          <p
            className={`text-lg capitalize px-4 py-2 rounded-lg text-white ${
              task.status === "completed" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {task.status}
          </p>
        </div>

        {/* Task Added Date */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Added On:</h3>
          <p className="text-lg text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
            {new Date(task.addedDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center">
          <button
            onClick={() => router.push(`/editTask/${taskId}`)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300 shadow-md"
          >
            <FaEdit />
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}
