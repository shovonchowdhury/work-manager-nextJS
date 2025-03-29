"use client";
import { fetchTasks } from "@/store/slice/taskSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../components/Task";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import Cookies from "js-cookie";

export default function ShowTask() {
  const { tasks, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const storedToken = Cookies.get("token");

  useEffect(() => {
    if (!user && !storedToken) {
      console.log(storedToken);
      router.replace("/logIn"); // Redirect when user is null
      return;
    }

    if (user?._id) {
      dispatch(fetchTasks(user._id));
    }
  }, [user, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!user && !storedToken) {
    return null; // Prevent render before redirect
  }

  console.log(tasks);

  return (
    <div className="max-w-2xl md:mx-auto mt-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Tasks
      </h2>

      {!tasks || tasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No tasks available.</p>
      ) : (
        <div className="space-y-4">
          {tasks
            .slice()
            .reverse()
            .map((task, index) => (
              <Task
                key={task._id}
                task={task}
                userId={user._id}
                index={index + 1}
              />
            ))}
        </div>
      )}
    </div>
  );
}
