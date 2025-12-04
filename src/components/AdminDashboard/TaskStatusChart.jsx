import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TaskStatusChart = ({ data }) => {
  const chartData = [
    { name: "Pending", count: data.Pending || 0 },
    { name: "In Progress", count: data.InProgress || 0 },
    { name: "Completed", count: data.Completed || 0 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-[#E0DDCF]">
      <h3 className="text-lg font-semibold text-[#3E3E2B] mb-4">Task Status Overview</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#5D7A6E" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#708D81" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TaskStatusChart;
