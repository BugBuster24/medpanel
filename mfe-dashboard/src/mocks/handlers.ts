import { http, HttpResponse } from "msw";
import {
  mockStats,
  mockPatients,
  mockAppointments,
  mockAdmissionTrend,
  mockDepartmentData,
} from "./data";

export const handlers = [
  http.get("/api/stats", () => HttpResponse.json(mockStats)),
  http.get("/api/patients", () => HttpResponse.json(mockPatients)),
  http.get("/api/appointments", () => HttpResponse.json(mockAppointments)),
  http.get("/api/admissions/trend", () =>
    HttpResponse.json(mockAdmissionTrend),
  ),
  http.get("/api/departments", () => HttpResponse.json(mockDepartmentData)),
];
