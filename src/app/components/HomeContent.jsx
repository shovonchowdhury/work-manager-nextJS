"use client"; // Mark this component as a client-side component

import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchTasks } from "@/store/slice/taskSlice";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const HomeContent = () => {
  const { tasks } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();
  const [clickedTask, setClickedTask] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchTasks(user._id));
    }
  }, [user, dispatch]);

  if (!user) {
    return <Loader />;
  }

  // Calculate the stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-3xl mx-auto mt-8 px-6 py-4 bg-white shadow-lg rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Manage Your Tasks
      </h2>

      {/* Welcome Message */}
      <p className="text-xl text-center text-gray-600">
        Welcome back! You have{" "}
        <span className="font-semibold text-gray-900">{totalTasks}</span> tasks
        in total.
      </p>

      {/* Task Stats */}
      <div className="text-center mt-6">
        <p className="text-lg text-gray-700">
          <span className="font-semibold text-green-500">{completedTasks}</span>{" "}
          Tasks Completed
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">{completionRate}%</span> Completion
          Rate
        </p>
        <progress
          value={completionRate}
          max="100"
          className="w-full mt-4 h-2 bg-gray-200"
        ></progress>
      </div>

      {/* Quick Access */}
      <div className="mt-6 flex justify-center space-x-6">
        <Link
          href="/addTask"
          className="btn btn-primary py-2 text-center px-4 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          Add New Task
        </Link>
        <Link
          href="/showTask"
          className="btn btn-secondary py-2 text-center px-4 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition duration-300"
        >
          View All Tasks
        </Link>
      </div>

      {/* Recent Tasks (if any) */}
      {totalTasks > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Recent Tasks
          </h3>
          <ul className="space-y-4">
            {tasks
              .slice()
              .reverse()
              .slice(0, 3)
              .map((task) => (
                <li
                  key={task._id}
                  className={`p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-200 transition duration-200 flex justify-between items-center transform ${
                    clickedTask === task._id ? "scale-95" : "scale-100"
                  }`}
                  onClick={() => setClickedTask(task._id)}
                >
                  <Link href={`/showTask/${task._id}`} className="flex-grow">
                    <div>
                      <p className="text-lg font-medium text-gray-800">
                        {task.title}
                      </p>
                      <p
                        className={`text-sm ${
                          task.status === "completed"
                            ? "text-green-700"
                            : "text-red-700"
                        }`}
                      >
                        {task.status}
                      </p>
                    </div>
                  </Link>
                  <Link
                    href={`/showTask/${task._id}`}
                    className="text-gray-600 hover:text-gray-900 text-2xl"
                  >
                    →
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Empty State */}
      {totalTasks === 0 && (
        <div className="mt-8 text-center text-red-600">
          <p>
            You don't have any tasks yet. Add your first task to get started!
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
