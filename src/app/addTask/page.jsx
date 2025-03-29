"use client";
import React, { useState } from "react";
import loginSvg from "../../../public/undraw_add-document_oqbr1.svg";
import Image from "next/image";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export default function AddTask() {
  const { user, loading } = useSelector((state) => state.auth);
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "",
  });

  const [addTaskState, setAddTaskState] = useState("Add Task");

  const addTaskHandler = async (e) => {
    e.preventDefault();

    try {
      setAddTaskState("Adding...");
      const response = await axios.post("/api/tasks", task);
      console.log(response.data);
      toast.success("Task added successfully!! Go to Show Tasks to view.", {
        position: "top-center",
      });
      setAddTaskState("Add Task");
    } catch (err) {
      console.log(err);
      setAddTaskState("Add Task");
      toast.error(`Task not added!!`, {
        position: "top-center",
      });
    }
  };

  const clearForm = () => {
    setTask({
      ...task,
      title: "",
      content: "",
      status: "",
    });
  };

  if (!user) {
    return null; // Prevent render before redirect
  }

  return (
    <div className="max-w-xl mx-auto bg-white px-6 pb-4 rounded-xl shadow-md mt-8">
      {/* Image */}
      <div className="flex justify-center mb-4">
        <Image
          src={loginSvg} // Replace with your actual image path
          alt=""
          className="w-1/2 h-1/2 mr-4"
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center">Add Your Task</h2>

      <form onSubmit={addTaskHandler} className="flex flex-col space-y-4">
        {/* Title Input */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(event) => {
              setTask({ ...task, title: event.target.value });
            }}
            value={task.title}
          />
        </div>

        {/* Content Textarea */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Content</label>
          <textarea
            placeholder="Enter task details"
            rows="4"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900 bg-gray-100"
            onChange={(event) => {
              setTask({ ...task, content: event.target.value });
            }}
            value={task.content}
          ></textarea>
        </div>

        {/* Status Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Status</label>
          <select
            className="border rounded-lg px-3 py-2 bg-gray-100"
            onChange={(event) => {
              setTask({ ...task, status: event.target.value });
            }}
            value={task.status}
          >
            <option value="" disabled>
              ---Select Status---
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Buttons */}
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
