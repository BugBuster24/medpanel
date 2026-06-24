import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Button } from "@hareharun/medpanel-shared";
const InfoRow = ({ label, value }) =>
  _jsxs("div", {
    style: {
      display: "flex",
      padding: "10px 0",
      borderBottom: "1px solid #F3F4F6",
    },
    children: [
      _jsx("span", {
        style: {
          width: "160px",
          color: "#6B7280",
          fontSize: "14px",
          fontWeight: 500,
        },
        children: label,
      }),
      _jsx("span", {
        style: { color: "#111827", fontSize: "14px" },
        children: value,
      }),
    ],
  });
export const PatientDetail = ({ patient, onBack }) =>
  _jsxs("div", {
    children: [
      _jsx("div", {
        style: { marginBottom: "16px" },
        children: _jsx(Button, {
          label: "\u2190 Back to Patients",
          variant: "secondary",
          onClick: onBack,
        }),
      }),
      _jsxs(Card, {
        title: `Patient: ${patient.name}`,
        children: [
          _jsx(InfoRow, { label: "Patient ID", value: patient.id }),
          _jsx(InfoRow, { label: "Age", value: patient.age }),
          _jsx(InfoRow, { label: "Gender", value: patient.gender }),
          _jsx(InfoRow, { label: "Phone", value: patient.phone }),
          _jsx(InfoRow, { label: "Email", value: patient.email }),
          _jsx(InfoRow, { label: "Condition", value: patient.condition }),
          _jsx(InfoRow, { label: "Admitted On", value: patient.admittedOn }),
        ],
      }),
    ],
  });
