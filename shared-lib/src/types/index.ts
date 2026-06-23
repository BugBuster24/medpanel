export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
}

export type Role = "admin" | "doctor" | "receptionist";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  tenantId: string;
}

export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  tenantId: string;
  condition: string;
  admittedOn: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  tenantId: string;
  department: string;
}

export interface DashboardStats {
  totalPatients: number;
  appointmentsToday: number;
  bedsAvailable: number;
  bedsOccupied: number;
  newPatientsThisMonth: number;
}
