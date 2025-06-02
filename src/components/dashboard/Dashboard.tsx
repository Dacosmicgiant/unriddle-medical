import React from 'react';
import { StatsCards } from './StatsCards';
import { GenderChart } from './charts/GenderChart';
import { AgeGroupChart } from './charts/AgeGroupChart';
import { DepartmentChart } from './charts/DepartmentChart';
import type { Patient } from '../../types/patient';

interface DashboardProps {
  patients: Patient[];
}

export const Dashboard: React.FC<DashboardProps> = ({ patients }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <StatsCards patients={patients} />
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        <GenderChart patients={patients} />
        <AgeGroupChart patients={patients} />
      </div>
      
      <DepartmentChart patients={patients} />
    </div>
  );
};