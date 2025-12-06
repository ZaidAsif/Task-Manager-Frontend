export default function ReportTable({ summaries }) {
  return (
    <div className="bg-white border border-[#E5E5E0] rounded-xl shadow p-4 mt-6">
      <h2 className="text-lg font-semibold text-[#2F2F2F] mb-3">
        Task Summary by User
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#556B2F]/10 uppercase tracking-wide text-xs text-[#2F2F2F]">
            <tr>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Completed</th>
              <th className="px-4 py-3 text-left">Pending</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Completion Rate</th>
            </tr>
          </thead>
          <tbody>
            {summaries.length > 0 ? (
              summaries.map((s) => (
                <tr
                  key={s.userId}
                  className="border-t border-[#EAE7DC] hover:bg-[#F9F8F4] transition"
                >
                  <td className="px-4 py-3 font-medium">{s.name}</td>
                  <td className="px-4 py-3 text-[#555]">{s.email}</td>
                  <td className="px-4 py-3 text-green-700">{s.completed}</td>
                  <td className="px-4 py-3 text-yellow-700">{s.pending}</td>
                  <td className="px-4 py-3">{s.total}</td>
                  <td className="px-4 py-3">
                    <div className="w-full bg-[#EAE7DC] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#556B2F] h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            (s.completed / (s.total || 1)) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center text-gray-500 py-6 italic"
                >
                  No user summary data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
