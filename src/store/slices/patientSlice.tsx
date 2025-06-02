import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Patient, PatientState } from '../../types/patient';
import { DEPARTMENTS, STATUSES, BLOOD_GROUPS } from '../../constants';

// Async thunk for fetching patients
export const fetchPatients = createAsyncThunk(
  'patients/fetchPatients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://dummyjson.com/users?limit=50');
      
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      
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

      return transformedPatients;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch patient data'
      );
    }
  }
);

// Initial state
const initialState: PatientState = {
  patients: [],
  loading: false,
  error: null,
  searchTerm: '',
  filterDepartment: '',
  filterStatus: ''
};

// Patient slice
const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient: (state, action: PayloadAction<Omit<Patient, 'id'>>) => {
      const newPatient: Patient = {
        ...action.payload,
        id: Math.max(...state.patients.map(p => p.id), 0) + 1
      };
      state.patients.push(newPatient);
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
    },
    deletePatient: (state, action: PayloadAction<number>) => {
      state.patients = state.patients.filter(p => p.id !== action.payload);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setFilterDepartment: (state, action: PayloadAction<string>) => {
      state.filterDepartment = action.payload;
    },
    setFilterStatus: (state, action: PayloadAction<string>) => {
      state.filterStatus = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
        state.error = null;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  addPatient,
  updatePatient,
  deletePatient,
  setSearchTerm,
  setFilterDepartment,
  setFilterStatus,
  clearError
} = patientSlice.actions;

export default patientSlice.reducer;