import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../api/taskApi";
import { useTaskStore } from "../store/taskStore";
import TaskTable from "../components/AdminTasks/TaskTable";
import TaskFormModal from "../components/AdminTasks/TaskFormModal";
import TaskFilters from "../components/AdminTasks/TaskFilters";
import { PlusCircle } from "lucide-react";
import PageHeader from "../components/common/PageHeader";


export default function AdminTasks() {
  const { tasks, setTasks, loading, setLoading, error, setError } = useTaskStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (err) {
      alert("Failed to delete task");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#2F2F2F]">Task Management</h1>
          <p className="text-sm text-[#666] mt-1">
            Monitor, assign, and manage project tasks efficiently.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[#556B2F] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#445726] transition"
        >
          <PlusCircle size={18} /> New Task
        </button>
      </div>

      <TaskFilters onFilterChange={fetchTasks} />

      <div className="bg-white border border-[#E5E5E0] rounded-xl shadow-md p-4">
        {loading ? (
          <p className="text-center text-gray-500 py-8">Loading tasks...</p>
        ) : (
          <TaskTable tasks={tasks} onDelete={handleDelete} />
        )}
      </div>

      {showForm && (
        <TaskFormModal
          onClose={() => setShowForm(false)}
          onSuccess={fetchTasks}
        />
      )}
    </div>
  );
}
