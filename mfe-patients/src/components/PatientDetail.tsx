import React from "react";
import { Patient } from "shared-lib";
import { Card, Button } from "shared-lib";

interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}

const InfoRow: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div
    style={{
      display: "flex",
      padding: "10px 0",
      borderBottom: "1px solid #F3F4F6",
    }}
  >
    <span
      style={{
        width: "160px",
        color: "#6B7280",
        fontSize: "14px",
        fontWeight: 500,
      }}
    >
      {label}
    </span>
    <span style={{ color: "#111827", fontSize: "14px" }}>{value}</span>
  </div>
);

export const PatientDetail: React.FC<PatientDetailProps> = ({
  patient,
  onBack,
}) => (
  <div>
    <div style={{ marginBottom: "16px" }}>
      <Button label="← Back to Patients" variant="secondary" onClick={onBack} />
    </div>
    <Card title={`Patient: ${patient.name}`}>
      <InfoRow label="Patient ID" value={patient.id} />
      <InfoRow label="Age" value={patient.age} />
      <InfoRow label="Gender" value={patient.gender} />
      <InfoRow label="Phone" value={patient.phone} />
      <InfoRow label="Email" value={patient.email} />
      <InfoRow label="Condition" value={patient.condition} />
      <InfoRow label="Admitted On" value={patient.admittedOn} />
    </Card>
  </div>
);
