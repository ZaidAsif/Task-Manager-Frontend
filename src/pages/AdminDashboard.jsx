import { useEffect } from "react";
import { useDashboardStore } from "../store/dashboardStore";
import StatCard from "../components/AdminDashboard/StatCard";
import TaskStatusChart from "../components/AdminDashboard/TaskStatusChart";
import TaskPriorityChart from "../components/AdminDashboard/TaskPriorityChart";
import RecentTasksTable from "../components/AdminDashboard/RecentTasksTable";
import { ClipboardList, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const AdminDashboard = () => {
  const { data, fetchDashboard, loading, error } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <p className="p-8 text-center">Loading dashboard...</p>;
  if (error) return <p className="p-8 text-center text-red-500">{error}</p>;
  if (!data) return null;

  const { statistics, charts, recentTasks } = data;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Tasks" value={statistics.totalTasks} icon={<ClipboardList />} color="olive" />
        <StatCard title="Pending" value={statistics.pendingTasks} icon={<Clock />} color="amber" />
        <StatCard title="Completed" value={statistics.completedTasks} icon={<CheckCircle />} color="green" />
        <StatCard title="Overdue" value={statistics.overdueTasks} icon={<AlertTriangle />} color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TaskStatusChart data={charts.taskDistribution} />
        <TaskPriorityChart data={charts.taskPriorityLevel} />
      </div>

      {/* Recent Tasks */}
      <RecentTasksTable tasks={recentTasks} />
    </div>
  );
};

export default AdminDashboard;
