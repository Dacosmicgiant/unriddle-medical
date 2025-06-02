import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Patient, AgeGroupData } from '../../../types/patient';
import { CHART_COLORS } from '../../../constants';

interface AgeGroupChartProps {
  patients: Patient[];
}

export const AgeGroupChart: React.FC<AgeGroupChartProps> = ({ patients }) => {
  const ageGroupData = patients.reduce((acc, patient) => {
    const age = new Date().getFullYear() - new Date(patient.birthDate).getFullYear();
    const group = age < 18 ? '0-17' : age < 35 ? '18-34' : age < 55 ? '35-54' : '55+';
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData: AgeGroupData[] = Object.entries(ageGroupData).map(([group, count]) => ({
    ageGroup: group,
    count
  }));

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Age Groups
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ageGroup" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill={CHART_COLORS.primary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};