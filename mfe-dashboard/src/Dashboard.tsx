import React from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "@hareharun/medpanel-shared";
import { StatCard } from "./components/StatCard";
import { AdmissionsChart } from "./components/AdmissionsChart";
import { DepartmentChart } from "./components/DepartmentChart";
import {
  mockStats,
  mockAdmissionTrend,
  mockDepartmentData,
} from "./mocks/data";

// Instead of fetching from an API, we return mock data directly.
// We wrap it in a Promise to keep the React Query pattern identical —
// if you connect a real API later, you only change this function.
const fetchStats = (): Promise<DashboardStats> => Promise.resolve(mockStats);

const fetchAdmissions = (): Promise<{ month: string; admissions: number }[]> =>
  Promise.resolve(mockAdmissionTrend);

const fetchDepartments = (): Promise<{ name: string; value: number }[]> =>
  Promise.resolve(mockDepartmentData);

export const Dashboard: React.FC = () => {
  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  const { data: admissions } = useQuery({
    queryKey: ["admissions"],
    queryFn: fetchAdmissions,
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ margin: "0 0 24px", fontSize: "22px", color: "#111827" }}>
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <StatCard
          title="Total Patients"
          value={stats?.totalPatients ?? 0}
          color="indigo"
        />
        <StatCard
          title="Appointments Today"
          value={stats?.appointmentsToday ?? 0}
          color="green"
        />
        <StatCard
          title="Beds Available"
          value={stats?.bedsAvailable ?? 0}
          color="orange"
        />
        <StatCard
          title="Beds Occupied"
          value={stats?.bedsOccupied ?? 0}
          color="red"
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
      >
        {admissions && <AdmissionsChart data={admissions} />}
        {departments && <DepartmentChart data={departments} />}
      </div>
    </div>
  );
};

export default Dashboard;
