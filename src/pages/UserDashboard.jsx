import React from "react";
import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import { getUserDashboardData } from "../api/taskApi";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  AlertTriangle,
  LayoutDashboard,
} from "lucide-react";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/AdminDashboard/StatCard";
import TaskStatusChart from "../components/AdminDashboard/TaskStatusChart";
import TaskPriorityChart from "../components/AdminDashboard/TaskPriorityChart";

const UserDashboard = () => {
  const {
    tasks,
    setTasks,
    setStatusSummary,
    loading,
    setLoading,
    error,
    setError,
  } = useTaskStore();
  const [data, setData] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await getUserDashboardData();
        setData(data);
        setTasks(data.recentTasks || []);
        setStatusSummary(data.statistics || {});
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setTasks, setStatusSummary, setLoading, setError]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] text-[#556B2F] font-medium">
        Loading dashboard...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-600 font-medium">
        {error}
      </div>
    );

  if (!data) return null;

  const { statistics, charts, recentTasks } = data;

  return (
    <div
      className="
        min-h-full
        text-[#2F2F2F]
        space-y-8
        overflow-x-auto
        bg-[#FAFAF5]
        p-4 sm:p-6
        max-w-screen-xl
        mx-auto
      "
      style={{ minHeight: "calc(100vh - 56px)" }} // Adjust for topbar height if needed
    >
      {/* Header */}
      <PageHeader
        title="My Dashboard"
        subtitle="Track your task progress and priorities at a glance."
        icon={<LayoutDashboard size={26} />}
        className="mb-6" // tighten header margin if needed
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={statistics.totalTasks}
          icon={<ClipboardList size={20} />}
          color="bg-[#E3E6D9] border-[#DADBCF]"
        />
        <StatCard
          title="Pending"
          value={statistics.pendingTasks}
          icon={<Clock size={20} />}
          color="bg-yellow-100 border-yellow-200"
        />
        <StatCard
          title="Completed"
          value={statistics.completedTasks}
          icon={<CheckCircle size={20} />}
          color="bg-green-100 border-green-200"
        />
        <StatCard
          title="Overdue"
          value={statistics.overdueTasks}
          icon={<AlertTriangle size={20} />}
          color="bg-red-100 border-red-200"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="bg-white/70 backdrop-blur border border-[#D6D3C9] rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#556B2F] mb-3">
            My Task Distribution
          </h2>
          <TaskStatusChart data={charts.taskDistribution} />
        </section>

        <section className="bg-white/70 backdrop-blur border border-[#D6D3C9] rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#556B2F] mb-3">
            Task Priority Overview
          </h2>
          <TaskPriorityChart data={charts.taskPriorityLevel} />
        </section>
      </div>

      {/* Performance Summary + Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Performance Summary */}
        <section className="bg-white/70 backdrop-blur border border-[#D6D3C9] rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#556B2F] mb-3">
            Performance Summary
          </h2>

          <div className="space-y-3">
            {(() => {
              const { completedTasks, totalTasks } = statistics;
              const completionRate =
                totalTasks > 0
                  ? Math.round((completedTasks / totalTasks) * 100)
                  : 0;

              return (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-[#2F2F2F]">
                      Completion Rate
                    </span>
                    <span className="text-[#556B2F] font-semibold">
                      {completionRate}%
                    </span>
                  </div>

                  <div className="w-full bg-[#EAE7DC] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#556B2F] h-full transition-all duration-500"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Keep up the great work! Aim for 100% task completion.
                  </p>
                </>
              );
            })()}
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section className="bg-white/70 backdrop-blur border border-[#D6D3C9] rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[#556B2F] mb-3">
            Upcoming Deadlines
          </h2>

          {recentTasks && recentTasks.length ? (
            <ul className="divide-y divide-[#EAE7DC] text-sm max-h-56 overflow-auto">
              {recentTasks
                .filter((t) => t.dueDate && new Date(t.dueDate) > new Date())
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 3)
                .map((task) => (
                  <li
                    key={task._id}
                    className="py-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium text-[#2F2F2F] truncate max-w-xs">
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium whitespace-nowrap ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">No upcoming tasks.</p>
          )}
        </section>
      </div>

      {/* Recent Tasks Table */}
      <section className="bg-white/70 backdrop-blur border border-[#D6D3C9] rounded-xl p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[#556B2F] mb-4">
          Recent Tasks
        </h2>
        {recentTasks.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#556B2F]/10 text-[#2F2F2F] uppercase text-xs tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {recentTasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-t border-[#EAE7DC] hover:bg-[#F9F8F4] transition"
                  >
                    <td className="px-4 py-3 font-medium max-w-xs truncate">
                      {task.title}
                    </td>
                    <td className="px-4 py-3 capitalize text-[#444] whitespace-nowrap">
                      {task.priority}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#666] whitespace-nowrap">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-6 italic">
            No recent tasks found.
          </p>
        )}
      </section>
    </div>
  );
};

export default UserDashboard;
