import React from 'react';

interface AdminHeaderProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-[32px] font-bold text-slate-900 tracking-tight mb-1">{title}</h1>
        <p className="text-slate-500 font-medium text-sm">{subtitle}</p>
      </div>
      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}
    </div>
  );
};

