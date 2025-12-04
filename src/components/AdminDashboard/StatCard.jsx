const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className="flex items-center justify-between bg-[#FFFFFF] shadow-md rounded-lg p-4 border border-[#E0DDCF]">
      <div>
        <h4 className="text-sm text-[#3E3E2B]/70">{title}</h4>
        <p className="text-2xl font-bold text-[#3E3E2B]">{value}</p>
      </div>
      <div className={`text-${color} text-3xl`}>{icon}</div>
    </div>
  );
};
export default StatCard;
