import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#9CBFA7", "#708D81", "#3E3E2B"];

const TaskPriorityChart = ({ data }) => {
  const chartData = [
    { name: "Low", value: data.Low || 0 },
    { name: "Medium", value: data.Medium || 0 },
    { name: "High", value: data.High || 0 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-[#E0DDCF]">
      <h3 className="text-lg font-semibold text-[#3E3E2B] mb-4">Task Priority Breakdown</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TaskPriorityChart;
