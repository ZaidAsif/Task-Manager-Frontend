import { ClipboardList, CheckCircle2, AlertCircle, Users } from "lucide-react";

export default function ReportStats({ stats }) {
  const statItems = [
    {
      title: "Total Tasks",
      value: stats.totalTasks || 0,
      icon: <ClipboardList size={22} />,
      color: "bg-[#EAE7DC] text-[#2F2F2F]",
    },
    {
      title: "Completed Tasks",
      value: stats.completed || 0,
      icon: <CheckCircle2 size={22} />,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Pending Tasks",
      value: stats.pending || 0,
      icon: <AlertCircle size={22} />,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Active Users",
      value: stats.activeUsers || 0,
      icon: <Users size={22} />,
      color: "bg-[#556B2F]/10 text-[#556B2F]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((s, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white border border-[#E5E5E0] rounded-xl p-4 shadow-sm hover:shadow transition"
        >
          <div className={`p-3 rounded-lg ${s.color}`}>{s.icon}</div>
          <div>
            <p className="text-sm text-[#666]">{s.title}</p>
            <h2 className="text-xl font-bold text-[#2F2F2F]">{s.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
