import React from 'react';
import { Activity, UserPlus } from 'lucide-react';

interface HeaderProps {
  onAddPatient: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddPatient }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Activity className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Healthcare Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onAddPatient}
              className="bg-blue-600 text-white px-3 py-2 sm:px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm sm:text-base"
            >
              <UserPlus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Patient</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};