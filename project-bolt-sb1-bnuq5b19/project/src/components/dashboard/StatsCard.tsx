import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'green':
        return 'bg-green-50 text-green-600 border-green-100';
      case 'yellow':
        return 'bg-yellow-50 text-yellow-600 border-yellow-100';
      case 'purple':
        return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'red':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-4 rounded-2xl border ${getColorClasses(color)}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};