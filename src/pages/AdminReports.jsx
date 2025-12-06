import { useState } from "react";
import { FileSpreadsheet, Users2, BarChart3, Download } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";
import PageHeader from "../components/common/PageHeader";

export default function AdminReports() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async (type) => {
    try {
      setLoading(true);
      const url =
        type === "tasks"
          ? "/reports/export/tasks"
          : "/reports/export/users";

      const response = await api.get(url, { responseType: "blob" });
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download =
        type === "tasks"
          ? `tasks_report_${new Date().toISOString().split("T")[0]}.xlsx`
          : `users_report_${new Date().toISOString().split("T")[0]}.xlsx`;
      link.click();
      toast.success("Report downloaded successfully");
    } catch {
      toast.error("Error downloading report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <PageHeader
        title="Reports & Exports"
        subtitle="Download Excel reports for task and user analytics."
        icon={<BarChart3 size={26} />}
      />

      {/* STATIC ANALYTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="—" icon={<Users2 />} color="#EAE7DC" />
        <StatCard title="Total Tasks" value="—" icon={<FileSpreadsheet />} color="#EAE7DC" />
        <StatCard title="Completed Tasks" value="—" icon={<FileSpreadsheet className='text-green-700' />} color="#E0F2E9" />
        <StatCard title="Pending Tasks" value="—" icon={<FileSpreadsheet className='text-yellow-700' />} color="#FFF5CC" />
      </div>

      {/* EXPORT SECTION */}
      <div className="bg-white rounded-xl shadow border border-[#E5E5E0] p-6 space-y-5">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="text-[#556B2F]" />
          <h2 className="text-lg font-semibold text-[#2F2F2F]">
            Export Excel Reports
          </h2>
        </div>
        <p className="text-sm text-gray-600">
          Generate up-to-date Excel files for project tracking and performance reviews.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <button
            onClick={() => handleDownload("tasks")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#556B2F] text-white px-4 py-2.5 rounded-md hover:bg-[#445726] transition w-full sm:w-auto disabled:opacity-50"
          >
            <Download size={18} /> Task Report
          </button>

          <button
            onClick={() => handleDownload("users")}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-[#708D81] text-[#F4F1DE] px-4 py-2.5 rounded-md hover:bg-[#5D7A6E] transition w-full sm:w-auto disabled:opacity-50"
          >
            <Download size={18} /> User Report
          </button>
        </div>
      </div>

      {/* STATIC RECENT EXPORTS TABLE */}
      <div className="bg-white border border-[#E5E5E0] rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-[#2F2F2F] mb-4">
          Recent Export Activity
        </h2>
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[#556B2F]/10 text-[#2F2F2F] uppercase">
            <tr>
              <th className="text-left py-2 px-3">Report Name</th>
              <th className="text-left py-2 px-3">Type</th>
              <th className="text-left py-2 px-3">Exported On</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-[#EAE7DC] hover:bg-[#F9F8F3]">
              <td className="py-2 px-3">Weekly Task Report</td>
              <td className="py-2 px-3">Tasks</td>
              <td className="py-2 px-3">Nov 30, 2025</td>
            </tr>
            <tr className="border-t border-[#EAE7DC] hover:bg-[#F9F8F3]">
              <td className="py-2 px-3">User Summary Report</td>
              <td className="py-2 px-3">Users</td>
              <td className="py-2 px-3">Nov 28, 2025</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

const StatCard = ({ title, value, icon, color }) => (
  <div
    className="flex items-center gap-4 p-4 rounded-lg shadow-sm border border-[#E5E5E0]"
    style={{ backgroundColor: color }}
  >
    <div className="p-3 bg-white/80 rounded-full">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <h3 className="text-xl font-semibold text-[#2F2F2F]">{value}</h3>
    </div>
  </div>
);
