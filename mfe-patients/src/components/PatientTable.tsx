import React from "react";
import { Patient } from "@hareharun/medpanel-shared";
import { Button } from "@hareharun/medpanel-shared";

interface PatientTableProps {
  patients: Patient[];
  onSelect: (patient: Patient) => void;
}

export const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onSelect,
}) => {
  const thStyle: React.CSSProperties = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6B7280",
    textTransform: "uppercase",
    borderBottom: "1px solid #E5E7EB",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#111827",
    borderBottom: "1px solid #F3F4F6",
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <thead>
        <tr>
          <th style={thStyle}>Name</th>
          <th style={thStyle}>Age</th>
          <th style={thStyle}>Gender</th>
          <th style={thStyle}>Condition</th>
          <th style={thStyle}>Admitted On</th>
          <th style={thStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient) => (
          <tr key={patient.id} style={{ transition: "background 0.15s" }}>
            <td style={tdStyle}>{patient.name}</td>
            <td style={tdStyle}>{patient.age}</td>
            {/* Capitalize first letter — a common TypeScript + string pattern */}
            <td style={tdStyle}>
              {patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)}
            </td>
            <td style={tdStyle}>{patient.condition}</td>
            <td style={tdStyle}>{patient.admittedOn}</td>
            <td style={tdStyle}>
              <Button
                label="View"
                size="sm"
                onClick={() => onSelect(patient)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
