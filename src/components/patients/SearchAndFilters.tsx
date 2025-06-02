import React from 'react';
import { Search, Filter } from 'lucide-react';
import { DEPARTMENTS, STATUSES } from '../../constants';

interface SearchAndFiltersProps {
  searchTerm: string;
  filterDepartment: string;
  filterStatus: string;
  onSearchChange: (term: string) => void;
  onDepartmentFilterChange: (department: string) => void;
  onStatusFilterChange: (status: string) => void;
  filteredCount: number;
  totalCount: number;
}

export const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  searchTerm,
  filterDepartment,
  filterStatus,
  onSearchChange,
  onDepartmentFilterChange,
  onStatusFilterChange,
  filteredCount,
  totalCount
}) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={filterDepartment}
          onChange={(e) => onDepartmentFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
        
        <select
          value={filterStatus}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Statuses</option>
          {STATUSES.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
        
        <div className="text-sm text-gray-600 flex items-center justify-center sm:justify-start">
          <Filter className="w-4 h-4 mr-2" />
          {filteredCount} of {totalCount} patients
        </div>
      </div>
    </div>
  );
};