export const DEPARTMENTS = [
  'Cardiology',
  'Neurology', 
  'Orthopedics',
  'Pediatrics',
  'Emergency',
  'ICU'
];

export const STATUSES = ['admitted', 'discharged', 'critical'];

export const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

export const STATUS_COLORS = {
  'admitted': 'bg-blue-100 text-blue-800',
  'discharged': 'bg-green-100 text-green-800',
  'critical': 'bg-red-100 text-red-800'
};

export const CHART_COLORS = {
  male: '#3B82F6',
  female: '#EC4899',
  primary: '#3B82F6',
  secondary: '#10B981'
} as const;