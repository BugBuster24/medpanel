import React from "react";
import { AppointmentStatus } from "../types";

interface BadgeProps {
  status: AppointmentStatus;
}

const statusStyles: Record<AppointmentStatus, React.CSSProperties> = {
  scheduled: { backgroundColor: "#DBEAFE", color: "#1D4ED8" },
  completed: { backgroundColor: "#D1FAE5", color: "#065F46" },
  cancelled: { backgroundColor: "#FEE2E2", color: "#991B1B" },
};

export const Badge: React.FC<BadgeProps> = ({ status }) => (
  <span
    style={{
      ...statusStyles[status],
      padding: "2px 10px",
      borderRadius: "999px",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "capitalize",
    }}
  >
    {status}
  </span>
);
