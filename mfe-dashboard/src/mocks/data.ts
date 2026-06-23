import { Patient, Appointment, DashboardStats } from "shared-lib";

export const mockStats: DashboardStats = {
  totalPatients: 1284,
  appointmentsToday: 47,
  bedsAvailable: 34,
  bedsOccupied: 118,
  newPatientsThisMonth: 93,
};

export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Arjun Reddy",
    age: 45,
    gender: "male",
    phone: "9876543210",
    email: "arjun@email.com",
    tenantId: "1",
    condition: "Hypertension",
    admittedOn: "2024-11-01",
  },
  {
    id: "p2",
    name: "Meena Krishnan",
    age: 32,
    gender: "female",
    phone: "9876543211",
    email: "meena@email.com",
    tenantId: "1",
    condition: "Diabetes",
    admittedOn: "2024-11-03",
  },
  {
    id: "p3",
    name: "Suresh Babu",
    age: 58,
    gender: "male",
    phone: "9876543212",
    email: "suresh@email.com",
    tenantId: "1",
    condition: "Cardiac Arrest",
    admittedOn: "2024-11-05",
  },
  {
    id: "p4",
    name: "Lakshmi Nair",
    age: 27,
    gender: "female",
    phone: "9876543213",
    email: "lakshmi@email.com",
    tenantId: "1",
    condition: "Appendicitis",
    admittedOn: "2024-11-07",
  },
  {
    id: "p5",
    name: "Vikram Singh",
    age: 63,
    gender: "male",
    phone: "9876543214",
    email: "vikram@email.com",
    tenantId: "2",
    condition: "Pneumonia",
    admittedOn: "2024-11-08",
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    patientName: "Arjun Reddy",
    doctorName: "Dr. Priya Sharma",
    date: "2024-11-10",
    time: "09:00",
    status: "scheduled",
    tenantId: "1",
    department: "Cardiology",
  },
  {
    id: "a2",
    patientId: "p2",
    patientName: "Meena Krishnan",
    doctorName: "Dr. Ravi Kumar",
    date: "2024-11-10",
    time: "10:30",
    status: "completed",
    tenantId: "1",
    department: "Endocrinology",
  },
  {
    id: "a3",
    patientId: "p3",
    patientName: "Suresh Babu",
    doctorName: "Dr. Priya Sharma",
    date: "2024-11-10",
    time: "11:00",
    status: "cancelled",
    tenantId: "1",
    department: "Cardiology",
  },
  {
    id: "a4",
    patientId: "p4",
    patientName: "Lakshmi Nair",
    doctorName: "Dr. Anita Rao",
    date: "2024-11-10",
    time: "14:00",
    status: "scheduled",
    tenantId: "1",
    department: "Surgery",
  },
  {
    id: "a5",
    patientId: "p5",
    patientName: "Vikram Singh",
    doctorName: "Dr. Suresh Pillai",
    date: "2024-11-10",
    time: "15:30",
    status: "scheduled",
    tenantId: "2",
    department: "Pulmonology",
  },
];

// Chart data — admissions per month
export const mockAdmissionTrend = [
  { month: "Jun", admissions: 65 },
  { month: "Jul", admissions: 78 },
  { month: "Aug", admissions: 90 },
  { month: "Sep", admissions: 81 },
  { month: "Oct", admissions: 110 },
  { month: "Nov", admissions: 93 },
];

// Chart data — appointments by department
export const mockDepartmentData = [
  { name: "Cardiology", value: 35 },
  { name: "Endocrinology", value: 20 },
  { name: "Surgery", value: 25 },
  { name: "Pulmonology", value: 15 },
  { name: "Neurology", value: 5 },
];
