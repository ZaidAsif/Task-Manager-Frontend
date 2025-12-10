import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTaskById,
  updateTaskStatus,
  updateChecklist,
} from "../api/taskApi";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  File,
  Flag,
  ListChecks,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchTask = async () => {
    try {
      const { data } = await getTaskById(id);
      setTask(data);
    } catch (err) {
      console.error("Error fetching task:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleChecklist = async (todoId) => {
    try {
      const updatedChecklist = task.todoChecklist.map((item) =>
        item._id === todoId ? { ...item, completed: !item.completed } : item
      );
      setTask({ ...task, todoChecklist: updatedChecklist });

      await updateChecklist(id, { todoChecklist: updatedChecklist });
      fetchTask();
    } catch (error) {
      console.error("Checklist update failed:", error.message);
      toast.error("Failed to update checklist");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      setUpdating(true);
      await updateTaskStatus(id, newStatus);
      toast.success(`Task marked as ${newStatus}`);
      fetchTask();
    } catch (error) {
      console.error("Error updating task status:", error.message);
      toast.error("Failed to update status");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading)
    return <p className="p-8 text-center text-gray-500">Loading task...</p>;
  if (!task)
    return <p className="p-8 text-center text-gray-500">Task not found</p>;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#556B2F] hover:underline mb-4"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* Task Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#EAE8E2] p-6 space-y-6 transition-all duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#2F2F2F]">
            {task.title}
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${statusColors[task.status]}`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed">{task.description}</p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <Flag size={16} className="text-[#556B2F]" />
            <strong>Priority:</strong> {task.priority}
          </span>
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-[#556B2F]" />
            <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>

        {/* Checklist Section */}
        <div className="bg-[#FAFAF5] border border-[#E5E5E0] rounded-lg p-5">
          <h3 className="font-medium mb-3 flex items-center gap-2 text-[#2F2F2F]">
            <ListChecks size={18} className="text-[#556B2F]" /> To-do Checklist
          </h3>
          <div className="space-y-2">
            {task.todoChecklist?.length > 0 ? (
              task.todoChecklist.map((todo) => (
                <label
                  key={todo._id}
                  className="flex items-center gap-3 cursor-pointer hover:bg-white/60 p-2 rounded transition"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleChecklist(todo._id)}
                    className="accent-[#556B2F] w-4 h-4"
                  />
                  <span
                    className={`text-sm ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No checklist items added.
              </p>
            )}
          </div>
        </div>

        {/* Attachments */}
        {task.attachments?.length > 0 && (
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2 text-[#2F2F2F]">
              <File size={18} className="text-[#556B2F]" /> Attachments
            </h3>
            <div className="flex flex-wrap gap-3">
              {task.attachments.map((att, i) => (
                <img
                  key={i}
                  src={att}
                  alt="attachment"
                  className="w-32 h-32 object-cover rounded-lg border border-[#E5E5E0] shadow-sm"
                />
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-3">
          {task.status === "Pending" && (
            <button
              disabled={updating}
              onClick={() => handleStatusChange("In Progress")}
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              <Play size={18} />
              {updating ? "Starting..." : "Start Task"}
            </button>
          )}

          {task.status === "In Progress" && (
            <button
              disabled={updating}
              onClick={() => handleStatusChange("Completed")}
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-[#556B2F] text-white font-medium hover:bg-[#445726] transition disabled:opacity-60"
            >
              <CheckCircle size={18} />
              {updating ? "Updating..." : "Mark as Done"}
            </button>
          )}

          {task.status === "Completed" && (
            <button
              disabled
              className="flex items-center gap-2 px-5 py-2 rounded-md bg-gray-400 text-white font-medium cursor-not-allowed"
            >
              <CheckCircle size={18} /> Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
