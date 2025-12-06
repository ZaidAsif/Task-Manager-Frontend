import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function ReportCharts({ chartData }) {
  const { taskTrends = [], priorityDistribution = [] } = chartData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Trend Chart */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-[#2F2F2F] mb-3">
          Task Completion Trend
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={taskTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E0" />
            <XAxis dataKey="date" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Line type="monotone" dataKey="completed" stroke="#556B2F" strokeWidth={2} />
            <Line type="monotone" dataKey="pending" stroke="#D6D3C9" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Priority Distribution */}
      <div className="bg-white border border-[#E5E5E0] rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold text-[#2F2F2F] mb-3">
          Tasks by Priority
        </h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={priorityDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E0" />
            <XAxis dataKey="priority" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Bar dataKey="count" fill="#556B2F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
