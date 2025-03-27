import { fetchTasks } from "@/store/slice/taskSlice";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import the icons
import { useDispatch } from "react-redux";

const Task = ({ task, userId }) => {
  const dispatch = useDispatch();

  const onDelete = async (taskId) => {
    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      dispatch(fetchTasks(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`shadow-md rounded-lg p-4  ${
        task.status === "completed"
          ? "bg-green-700 text-white"
          : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold">{task?.title}</h3>
          <p className="text-sm break-words overflow-hidden">
            {task?.content}
          </p>{" "}
          {/* Adjusted overflow */}
        </div>
        <div className="flex-shrink-0 px-3 h-[30px] py-1 rounded-full text-sm font-semibold mt-2 md:mt-0 bg-white text-black">
          {task.status === "completed" ? "Completed" : "Pending"}
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-4">
        {/* Edit Button with Icon */}
        <button
          onClick={() => onEdit(task._id)}
          className="flex justify-center text-white rounded-full p-2 hover:scale-125 transform transition-all duration-300 cursor-pointer"
        >
          <FaEdit className="text-xl" />
        </button>

        {/* Delete Button with Icon */}
        <button
          onClick={() => onDelete(task._id)}
          className="text-white rounded-full p-2 hover:scale-125 transform transition-all duration-300 cursor-pointer"
        >
          <FaTrashAlt className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Task;
