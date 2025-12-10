const ProgressBar = ({ progress }) => (
  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
    <div
      className="bg-[#556B2F] h-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);
export default ProgressBar;
