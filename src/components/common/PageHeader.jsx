// src/components/common/PageHeader.jsx
export default function PageHeader({ title, subtitle, icon, actions }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#2F2F2F] flex items-center gap-2">
          {icon && <span className="text-[#556B2F]">{icon}</span>}
          {title}
        </h1>
        {subtitle && <p className="text-sm text-[#666] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </div>
  );
}
