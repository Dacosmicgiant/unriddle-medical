import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { Patient, ChartData } from '../../../types/patient';
import { CHART_COLORS } from '../../../constants';

interface GenderChartProps {
  patients: Patient[];
}

export const GenderChart: React.FC<GenderChartProps> = ({ patients }) => {
  const genderData: ChartData[] = [
    { 
      name: 'Male', 
      value: patients.filter(p => p.gender === 'male').length, 
      color: CHART_COLORS.male 
    },
    { 
      name: 'Female', 
      value: patients.filter(p => p.gender === 'female').length, 
      color: CHART_COLORS.female 
    }
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Gender Distribution
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={genderData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {genderData.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};