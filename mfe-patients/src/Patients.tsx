import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Patient } from "@hareharun/medpanel-shared";
import { PatientTable } from "./components/PatientTable";
import { PatientDetail } from "./components/PatientDetail";
import { SearchBar } from "./components/SearchBar";
import { mockPatients } from "./mocks/data";

const fetchPatients = (): Promise<Patient[]> => Promise.resolve(mockPatients);

export const Patients: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [search, setSearch] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<
    "all" | "male" | "female" | "other"
  >("all");

  const { data: patients, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
  });

  const filtered = (patients ?? []).filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.toLowerCase());
    const matchesGender = genderFilter === "all" || p.gender === genderFilter;
    return matchesSearch && matchesGender;
  });

  if (isLoading)
    return (
      <p style={{ padding: "40px", color: "#6B7280" }}>Loading patients...</p>
    );

  if (selectedPatient) {
    return (
      <div style={{ padding: "24px" }}>
        <PatientDetail
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ margin: "0 0 24px", fontSize: "22px", color: "#111827" }}>
        Patient Records
      </h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or condition..."
          />
        </div>
        <select
          value={genderFilter}
          onChange={(e) =>
            setGenderFilter(
              e.target.value as "all" | "male" | "female" | "other",
            )
          }
          style={{
            padding: "10px 14px",
            fontSize: "14px",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        >
          <option value="all">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#6B7280" }}>
        Showing {filtered.length} of {patients?.length ?? 0} patients
      </p>

      <PatientTable patients={filtered} onSelect={setSelectedPatient} />
    </div>
  );
};

export default Patients;
