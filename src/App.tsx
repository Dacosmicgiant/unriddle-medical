import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientManagement } from './components/patients/PatientManagement';
import { PatientModal } from './components/patients/PatientModal';
import { usePatients } from './hooks/usePatients';
import { LoadingSpinner } from './components/ui';
import { ErrorMessage } from './components/ui';
import type { Patient } from './types/patient';

const App: React.FC = () => {
  const {
    state,
    addPatient,
    updatePatient,
    deletePatient,
    setSearchTerm,
    setFilterDepartment,
    setFilterStatus,
    fetchPatients
  } = usePatients();

  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleSubmitPatient = (patientData: Patient | Omit<Patient, 'id'>) => {
    if ('id' in patientData) {
      updatePatient(patientData);
      setEditingPatient(null);
    } else {
      addPatient(patientData);
    }
    setShowModal(false);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowModal(true);
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPatient(null);
  };

  if (state.loading) {
    return <LoadingSpinner />;
  }

  if (state.error) {
    return <ErrorMessage error={state.error} onRetry={fetchPatients} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddPatient={handleAddPatient} />
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard patients={state.patients} />}
        
        {activeTab === 'patients' && (
          <PatientManagement
            patients={state.patients}
            searchTerm={state.searchTerm}
            filterDepartment={state.filterDepartment}
            filterStatus={state.filterStatus}
            onSearchChange={setSearchTerm}
            onDepartmentFilterChange={setFilterDepartment}
            onStatusFilterChange={setFilterStatus}
            onEditPatient={handleEditPatient}
            onDeletePatient={deletePatient}
          />
        )}
      </main>

      {showModal && (
        <PatientModal
          patient={editingPatient}
          onSubmit={handleSubmitPatient}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;