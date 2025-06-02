// Type definitions derived from constants
export type Department = 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics' | 'Emergency' | 'ICU';
export type PatientStatus = 'admitted' | 'discharged' | 'critical';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female';
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  admissionDate: string;
  department: Department;
  status: PatientStatus;
  bloodGroup?: BloodGroup;
  emergencyContact?: string;
}

export interface PatientState {
  patients: Patient[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filterDepartment: string;
  filterStatus: string;
}

export type PatientAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PATIENTS'; payload: Patient[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'DELETE_PATIENT'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTER_DEPARTMENT'; payload: string }
  | { type: 'SET_FILTER_STATUS'; payload: string };

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface AgeGroupData {
  ageGroup: string;
  count: number;
}

export interface DepartmentData {
  department: string;
  count: number;
}