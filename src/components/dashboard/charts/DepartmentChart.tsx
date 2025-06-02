import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Patient, DepartmentData } from '../../../types/patient';
import { DEPARTMENTS, CHART_COLORS } from '../../../constants';

interface DepartmentChartProps {
  patients: Patient[];
}

export const DepartmentChart: React.FC<DepartmentChartProps> = ({ patients }) => {
  const departmentData: DepartmentData[] = DEPARTMENTS.map(dept => ({
    department: dept,
    count: patients.filter(p => p.department === dept).length
  }));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Patients by Department
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={departmentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="department" 
            angle={-45} 
            textAnchor="end" 
            height={80}
            fontSize={12}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill={CHART_COLORS.secondary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};