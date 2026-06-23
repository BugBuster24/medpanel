import React from "react";
import { Appointment, AppointmentStatus, Badge, Button } from "shared-lib";

interface AppointmentTableProps {
  appointments: Appointment[];
  onStatusChange: (id: string, status: AppointmentStatus) => void;
  isUpdating: boolean;
}

const nextStatus: Record<AppointmentStatus, AppointmentStatus> = {
  scheduled: "completed",
  completed: "cancelled",
  cancelled: "scheduled",
};

const nextStatusLabel: Record<AppointmentStatus, string> = {
  scheduled: "Mark Complete",
  completed: "Mark Cancelled",
  cancelled: "Reschedule",
};

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments,
  onStatusChange,
  isUpdating,
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
          <th style={thStyle}>Patient</th>
          <th style={thStyle}>Doctor</th>
          <th style={thStyle}>Department</th>
          <th style={thStyle}>Date</th>
          <th style={thStyle}>Time</th>
          <th style={thStyle}>Status</th>
          <th style={thStyle}>Action</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt) => (
          <tr key={appt.id}>
            <td style={tdStyle}>{appt.patientName}</td>
            <td style={tdStyle}>{appt.doctorName}</td>
            <td style={tdStyle}>{appt.department}</td>
            <td style={tdStyle}>{appt.date}</td>
            <td style={tdStyle}>{appt.time}</td>
            <td style={tdStyle}>
              <Badge status={appt.status} />
            </td>
            <td style={tdStyle}>
              <Button
                label={nextStatusLabel[appt.status]}
                size="sm"
                variant={appt.status === "cancelled" ? "secondary" : "primary"}
                disabled={isUpdating}
                onClick={() => onStatusChange(appt.id, nextStatus[appt.status])}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
