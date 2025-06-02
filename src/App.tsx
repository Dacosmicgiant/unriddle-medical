import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientManagement } from './components/patients/PatientManagement';
import { PatientModal } from './components/patients/PatientModal';
import { LoadingSpinner } from './components/ui';
import { ErrorMessage } from './components/ui';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  fetchPatients,
  addPatient,
  updatePatient,
  deletePatient,
  setSearchTerm,
  setFilterDepartment,
  setFilterStatus,
  clearError
} from './store/slices/patientSlice';
import type { Patient } from './types/patient';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { 
    patients, 
    loading, 
    error, 
    searchTerm, 
    filterDepartment, 
    filterStatus 
  } = useAppSelector((state) => state.patients);

  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleSubmitPatient = (patientData: Patient | Omit<Patient, 'id'>) => {
    if ('id' in patientData) {
      dispatch(updatePatient(patientData));
      setEditingPatient(null);
    } else {
      dispatch(addPatient(patientData));
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

  const handleDeletePatient = (id: number) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      dispatch(deletePatient(id));
    }
  };

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchPatients());
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddPatient={handleAddPatient} />
      
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard patients={patients} />}
        
        {activeTab === 'patients' && (
          <PatientManagement
            patients={patients}
            searchTerm={searchTerm}
            filterDepartment={filterDepartment}
            filterStatus={filterStatus}
            onSearchChange={(term) => dispatch(setSearchTerm(term))}
            onDepartmentFilterChange={(department) => dispatch(setFilterDepartment(department))}
            onStatusFilterChange={(status) => dispatch(setFilterStatus(status))}
            onEditPatient={handleEditPatient}
            onDeletePatient={handleDeletePatient}
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