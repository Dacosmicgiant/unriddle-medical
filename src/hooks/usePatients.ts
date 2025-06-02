import { useReducer, useCallback } from 'react';
import type { Patient, PatientState, PatientAction } from '../types/patient';
import { DEPARTMENTS, STATUSES, BLOOD_GROUPS } from '../constants';

const initialState: PatientState = {
  patients: [],
  loading: true,
  error: null,
  searchTerm: '',
  filterDepartment: '',
  filterStatus: ''
};

const patientReducer = (state: PatientState, action: PatientAction): PatientState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'ADD_PATIENT':
      return { ...state, patients: [...state.patients, action.payload] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter(p => p.id !== action.payload)
      };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    case 'SET_FILTER_DEPARTMENT':
      return { ...state, filterDepartment: action.payload };
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload };
    default:
      return state;
  }
};

export const usePatients = () => {
  const [state, dispatch] = useReducer(patientReducer, initialState);

  const fetchPatients = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('https://dummyjson.com/users?limit=50');
      const data = await response.json();
      
      const transformedPatients: Patient[] = data.users.map((user: any) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        gender: user.gender,
        address: user.address,
        admissionDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0],
        department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)],
        bloodGroup: BLOOD_GROUPS[Math.floor(Math.random() * BLOOD_GROUPS.length)],
        emergencyContact: user.phone.replace(/\d{3}$/, '999')
      }));

      dispatch({ type: 'SET_PATIENTS', payload: transformedPatients });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch patient data' });
    }
  }, []);

  const addPatient = useCallback((patientData: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Math.max(...state.patients.map(p => p.id), 0) + 1
    };
    dispatch({ type: 'ADD_PATIENT', payload: newPatient });
  }, [state.patients]);

  const updatePatient = useCallback((patient: Patient) => {
    dispatch({ type: 'UPDATE_PATIENT', payload: patient });
  }, []);

  const deletePatient = useCallback((id: number) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      dispatch({ type: 'DELETE_PATIENT', payload: id });
    }
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  }, []);

  const setFilterDepartment = useCallback((department: string) => {
    dispatch({ type: 'SET_FILTER_DEPARTMENT', payload: department });
  }, []);

  const setFilterStatus = useCallback((status: string) => {
    dispatch({ type: 'SET_FILTER_STATUS', payload: status });
  }, []);

  return {
    state,
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
    setSearchTerm,
    setFilterDepartment,
    setFilterStatus
  };
};