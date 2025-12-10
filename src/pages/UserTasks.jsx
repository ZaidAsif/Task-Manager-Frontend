import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskCard from "../components/Tasks/TaskCard";
import TaskDetailsModal from "../components/Tasks/TaskDetailsModal";
import { Search, Filter } from "lucide-react";

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks();
      console.log("✅ Fetched tasks:", data);
      setTasks(data.tasks);
      setFiltered(data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let filteredList = tasks;
    if (filter !== "All") filteredList = tasks.filter(t => t.status === filter);
    if (search)
      filteredList = filteredList.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    setFiltered(filteredList);
  }, [filter, search, tasks]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-[#2F2F2F]">My Tasks</h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              placeholder="Search tasks..."
              className="pl-10 pr-4 py-2 border border-[#D6D3C9] rounded-md focus:ring-2 focus:ring-[#556B2F]/40 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-[#D6D3C9] rounded-md px-3 py-2">
            <Filter size={16} className="text-[#556B2F] mr-2" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent outline-none text-sm text-[#2F2F2F]"
            >
              {["All", "Pending", "In Progress", "Completed"].map(opt => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-8 text-gray-500">Loading tasks...</p>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((task) => (
            <TaskCard key={task._id} task={task} onClick={() => setSelected(task)} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">No tasks found.</p>
      )}

      {selected && (
        <TaskDetailsModal task={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default UserTasks;
