export default function TaskTable({ tasks, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#556B2F]/10 text-[#2F2F2F] uppercase tracking-wide text-xs">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr
                key={task._id}
                className="border-t border-[#EAE7DC] hover:bg-[#F9F8F4] transition"
              >
                <td className="px-4 py-3 font-medium">{task.title}</td>
                <td className="px-4 py-3">{task.status}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#666]">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center text-gray-500 py-6 italic"
              >
                No tasks available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
