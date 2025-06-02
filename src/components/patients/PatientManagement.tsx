import React, { useMemo } from 'react';
import { SearchAndFilters } from './SearchAndFilters';
import { PatientTable } from './PatientTable';
import type { Patient } from '../../types/patient';

interface PatientManagementProps {
  patients: Patient[];
  searchTerm: string;
  filterDepartment: string;
  filterStatus: string;
  onSearchChange: (term: string) => void;
  onDepartmentFilterChange: (department: string) => void;
  onStatusFilterChange: (status: string) => void;
  onEditPatient: (patient: Patient) => void;
  onDeletePatient: (id: number) => void;
}

export const PatientManagement: React.FC<PatientManagementProps> = ({
  patients,
  searchTerm,
  filterDepartment,
  filterStatus,
  onSearchChange,
  onDepartmentFilterChange,
  onStatusFilterChange,
  onEditPatient,
  onDeletePatient
}) => {
  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      const matchesSearch = `${patient.firstName} ${patient.lastName} ${patient.email}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDepartment = !filterDepartment || patient.department === filterDepartment;
      const matchesStatus = !filterStatus || patient.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [patients, searchTerm, filterDepartment, filterStatus]);

  return (
    <div className="space-y-6">
      <SearchAndFilters
        searchTerm={searchTerm}
        filterDepartment={filterDepartment}
        filterStatus={filterStatus}
        onSearchChange={onSearchChange}
        onDepartmentFilterChange={onDepartmentFilterChange}
        onStatusFilterChange={onStatusFilterChange}
        filteredCount={filteredPatients.length}
        totalCount={patients.length}
      />
      
      <PatientTable
        patients={filteredPatients}
        onEditPatient={onEditPatient}
        onDeletePatient={onDeletePatient}
      />
    </div>
  );
};