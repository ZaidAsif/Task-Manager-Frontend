import { Calendar, Flag } from "lucide-react";
import ProgressBar from "./ProgressBar";

const fallback = "task-card-fallback.png";

const TaskCard = ({ task, onClick }) => {
  const progress = task.progress || 0;

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
  };

  const priorityColors = {
    Low: "text-green-600",
    Medium: "text-amber-600",
    High: "text-red-600",
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white border border-[#E5E5E0] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-[360px]"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={task.attachments?.[0] || fallback}
          onError={(e) => (e.target.src = fallback)}
          alt="task"
          className="h-40 w-full object-cover"
        />
        {/* Status Badge */}
        <span
          className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium shadow-sm ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 flex-grow">
        <div className="space-y-2 flex-grow">
          <h3 className="font-semibold text-[#2F2F2F] line-clamp-1">
            {task.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {task.description || "No description provided."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <ProgressBar progress={progress} />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
          <span className="flex items-center gap-1">
            <Flag
              size={12}
              className={priorityColors[task.priority] || "text-gray-400"}
            />
            {task.priority || "N/A"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
