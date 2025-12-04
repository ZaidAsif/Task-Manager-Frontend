export default function TaskTable({ tasks, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white shadow rounded">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-[#E9E5D6]">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Priority</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="border-b hover:bg-[#F8F7F2]">
              <td className="p-3">{task.title}</td>
              <td className="p-3">{task.status}</td>
              <td className="p-3">{task.priority}</td>
              <td className="p-3">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="p-3 text-right space-x-2">
                <button className="text-blue-600 hover:underline">Edit</button>
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => onDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td className="text-center py-4 text-gray-500" colSpan="5">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
