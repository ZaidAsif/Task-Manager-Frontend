import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskDetailsModal = ({ task, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold text-[#2F2F2F] mb-2">{task.title}</h2>
          <p className="text-sm text-gray-600 mb-3">{task.description}</p>

          <div className="text-sm text-gray-500 space-y-1">
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>

          <button
            onClick={() => navigate(`/tasks/${task._id}`)}
            className="mt-4 w-full bg-[#556B2F] hover:bg-[#445726] text-white py-2 rounded-md transition-all"
          >
            View Full Details
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TaskDetailsModal;
