import React from 'react';
import { Activity, Users } from 'lucide-react';

interface NavigationTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: NavigationTab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'patients', label: 'Patients', icon: Users }
];

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-4 sm:space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};