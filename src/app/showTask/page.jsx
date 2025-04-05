"use client";
import { fetchTasks } from "@/store/slice/taskSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "../components/Task";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import Cookies from "js-cookie";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ShowTask() {
  const { tasks, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const storedToken = Cookies.get("token");

  // State to track the filter options
  const [selectedFilter, setSelectedFilter] = React.useState("all");

  useEffect(() => {
    const initAOS = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-bottom",
      });
    };
    initAOS();
  }, []);

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

  // Handle changing the filter
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks
    .slice()
    .reverse()
    .filter((task) => {
      if (selectedFilter === "all") return true; // Show all tasks
      if (selectedFilter === "pending" && task.status === "pending")
        return true; // Show pending tasks
      if (selectedFilter === "completed" && task.status === "completed")
        return true; // Show completed tasks
      return false;
    });

  return (
    <div className="max-w-2xl md:mx-auto mt-6">
      {/* Page Heading */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Tasks
      </h2>

      {/* Filter Checkboxes */}
      <div className="flex justify-center mb-4 space-x-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="all"
            checked={selectedFilter === "all"}
            onChange={() => handleFilterChange("all")}
            className="form-checkbox"
          />
          <label htmlFor="all" className="ml-2  text-gray-700">
            All
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pending"
            checked={selectedFilter === "pending"}
            onChange={() => handleFilterChange("pending")}
            className="form-checkbox"
          />
          <label htmlFor="pending" className="ml-2 text-gray-700">
            Pending
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="completed"
            checked={selectedFilter === "completed"}
            onChange={() => handleFilterChange("completed")}
            className="form-checkbox"
          />
          <label htmlFor="completed" className="ml-2  text-gray-700">
            Completed
          </label>
        </div>
      </div>

      {!filteredTasks || filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-4">No tasks available.</p>
      ) : (
        <div className="space-y-4 " data-aos="fade-up">
          {filteredTasks.map((task, index) => (
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
