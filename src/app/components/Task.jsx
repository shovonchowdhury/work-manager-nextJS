import Swal from "sweetalert2"; // Import SweetAlert2
import { deleteTask, fetchTasks } from "@/store/slice/taskSlice";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import the icons
import { useDispatch } from "react-redux";
import Link from "next/link";

const Task = ({ task, userId, index }) => {
  const dispatch = useDispatch();

  // Delete function with SweetAlert confirmation
  const onDelete = async (taskId) => {
    try {
      // Show SweetAlert confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        // If the user confirmed, proceed with deletion
        await axios.delete(`/api/tasks/${taskId}`);
        // dispatch(fetchTasks(userId)); // Refresh tasks list
        dispatch(deleteTask(taskId));
        Swal.fire("Deleted!", "Your task has been deleted.", "success"); // Show success alert
      }
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Something went wrong. Please try again.", "error"); // Show error alert if something fails
    }
  };

  return (
    <div className="flex h-full gap-1 md:gap- mx-1 ">
      {/* Serial Number on the Left */}
      <div
        className={`${
          task.status === "completed" ? "bg-green-700" : "bg-gray-900"
        } text-white text-xl border font-semibold rounded-l-lg   min-h-full flex justify-center items-center p-2`}
      >
        {index}
      </div>

      {/* Task Content Section */}
      <div
        className={`shadow-md rounded-r-lg p-4 flex-grow h-full ${
          task.status === "completed"
            ? "bg-green-700 text-white"
            : "bg-gray-900 text-white"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 flex flex-col">
            <h3 className="text-xl font-semibold">{task?.title}</h3>
            <p className=" mt-2 break-words overflow-hidden">{task?.content}</p>
          </div>
          <div className="flex-shrink-0 px-3 h-[30px] py-1 rounded-full text-sm font-semibold mt-2 md:mt-0 bg-white text-black">
            {task.status === "completed" ? "Completed" : "Pending"}
          </div>
        </div>

        <div className="flex mt-4 items-center justify-between">
          <Link href={`/showTask/${task._id}`}>
            <button className="px-2 py-1 md:p-2 border rounded-2xl hover:text-gray-300 cursor-pointer">
                View Details
            </button>
          </Link>
          <div className="flex  space-x-4">
            {/* Edit Button with Icon */}
            <Link href={`/editTask/${task._id}`}>
              <button className="flex justify-center text-white rounded-full p-2 hover:scale-125 transform transition-all duration-300 cursor-pointer">
                <FaEdit className="text-xl" />
              </button>
            </Link>

            {/* Delete Button with Icon */}
            <button
              onClick={() => onDelete(task._id)}
              className="text-white rounded-full p-2 hover:scale-125 transform transition-all duration-300 cursor-pointer"
            >
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
