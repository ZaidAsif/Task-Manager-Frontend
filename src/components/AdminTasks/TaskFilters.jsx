// src/components/AdminTasks/TaskFilters.jsx
import { useState } from "react";
import { Search, Filter } from "lucide-react";

const TaskFilters = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleChange = () => {
    onFilterChange({ searchTerm, status, priority });
  };

  return (
    <div className="bg-[#E9E5D6] p-4 rounded-lg shadow-sm border border-[#D3CFC2] flex flex-wrap items-center gap-3">
      {/* Search Bar */}
      <div className="flex items-center bg-white border border-[#CFCBBE] rounded px-2 py-1 flex-grow md:flex-grow-0">
        <Search size={18} className="text-[#708D81] mr-2" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            handleChange();
          }}
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>

      {/* Status Filter */}
      <div className="flex items-center bg-white border border-[#CFCBBE] rounded px-2 py-1">
        <Filter size={18} className="text-[#708D81] mr-2" />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleChange();
          }}
          className="bg-transparent text-sm outline-none"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority Filter */}
      <div className="flex items-center bg-white border border-[#CFCBBE] rounded px-2 py-1">
        <Filter size={18} className="text-[#708D81] mr-2" />
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            handleChange();
          }}
          className="bg-transparent text-sm outline-none"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
    