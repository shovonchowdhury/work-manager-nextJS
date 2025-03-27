"use client";
import { fetchTasks } from "@/store/slice/taskSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../components/Task";

export default function ShowTask() {
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchTasks(user._id));
    }
  }, [user, dispatch]);

  console.log(tasks);

  return (
    <div className="max-w-2xl mx-auto mt-6">
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
            .map((task) => (
              <Task key={task._id} task={task} userId={user._id} />
            ))}
        </div>
      )}
    </div>
  );
}
