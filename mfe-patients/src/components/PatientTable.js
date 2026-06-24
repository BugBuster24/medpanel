import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@hareharun/medpanel-shared";
export const PatientTable = ({ patients, onSelect }) => {
  const thStyle = {
    textAlign: "left",
    padding: "10px 14px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6B7280",
    textTransform: "uppercase",
    borderBottom: "1px solid #E5E7EB",
  };
  const tdStyle = {
    padding: "12px 14px",
    fontSize: "14px",
    color: "#111827",
    borderBottom: "1px solid #F3F4F6",
  };
  return _jsxs("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "#fff",
      borderRadius: "10px",
      overflow: "hidden",
    },
    children: [
      _jsx("thead", {
        children: _jsxs("tr", {
          children: [
            _jsx("th", { style: thStyle, children: "Name" }),
            _jsx("th", { style: thStyle, children: "Age" }),
            _jsx("th", { style: thStyle, children: "Gender" }),
            _jsx("th", { style: thStyle, children: "Condition" }),
            _jsx("th", { style: thStyle, children: "Admitted On" }),
            _jsx("th", { style: thStyle, children: "Action" }),
          ],
        }),
      }),
      _jsx("tbody", {
        children: patients.map((patient) =>
          _jsxs(
            "tr",
            {
              style: { transition: "background 0.15s" },
              children: [
                _jsx("td", { style: tdStyle, children: patient.name }),
                _jsx("td", { style: tdStyle, children: patient.age }),
                _jsx("td", {
                  style: tdStyle,
                  children:
                    patient.gender.charAt(0).toUpperCase() +
                    patient.gender.slice(1),
                }),
                _jsx("td", { style: tdStyle, children: patient.condition }),
                _jsx("td", { style: tdStyle, children: patient.admittedOn }),
                _jsx("td", {
                  style: tdStyle,
                  children: _jsx(Button, {
                    label: "View",
                    size: "sm",
                    onClick: () => onSelect(patient),
                  }),
                }),
              ],
            },
            patient.id,
          ),
        ),
      }),
    ],
  });
};
