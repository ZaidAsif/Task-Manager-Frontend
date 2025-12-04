import { useEffect, useState } from "react";
import { getTasks, deleteTask } from "../api/taskApi";
import { useTaskStore } from "../store/taskStore";
import TaskTable from "../components/AdminTasks/TaskTable";
import TaskFormModal from "../components/AdminTasks/TaskFormModal";
import TaskFilters from "../components/AdminTasks/TaskFilters";

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#708D81] text-[#F4F1DE] px-4 py-2 rounded hover:bg-[#5D7A6E] transition"
        >
          + New Task
        </button>
      </div>

      <TaskFilters onFilter={fetchTasks} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskTable tasks={tasks} onDelete={handleDelete} />
      )}

      {showForm && (
        <TaskFormModal
          onClose={() => setShowForm(false)}
          onSuccess={fetchTasks}
        />
      )}
    </div>
  );
}
