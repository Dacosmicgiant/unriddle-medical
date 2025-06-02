import React from 'react';
import { Users, Activity, Calendar, UserPlus } from 'lucide-react';
import type { Patient } from '../../types/patient';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center">
      <div className={`p-2 ${color} rounded-lg`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

interface StatsCardsProps {
  patients: Patient[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ patients }) => {
  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Admitted',
      value: patients.filter(p => p.status === 'admitted').length,
      icon: Activity,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Critical',
      value: patients.filter(p => p.status === 'critical').length,
      icon: Calendar,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Discharged',
      value: patients.filter(p => p.status === 'discharged').length,
      icon: UserPlus,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};