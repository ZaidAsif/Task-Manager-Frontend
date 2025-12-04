const RecentTasksTable = ({ tasks }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-[#E0DDCF]">
      <h3 className="text-lg font-semibold text-[#3E3E2B] mb-4">Recent Tasks</h3>
      <table className="w-full text-sm">
        <thead className="text-left border-b border-[#E0DDCF] text-[#3E3E2B]/70">
          <tr>
            <th className="pb-2">Title</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Priority</th>
            <th className="pb-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks?.map((t, idx) => (
            <tr key={idx} className="border-b border-[#E0DDCF]/60 hover:bg-[#F9F8F3] transition">
              <td className="py-2">{t.title}</td>
              <td className="py-2">{t.status}</td>
              <td className="py-2">{t.priority}</td>
              <td className="py-2">{new Date(t.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default RecentTasksTable;
