import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth, useTenant } from "shared-lib";

const linkStyle = ({
  isActive,
}: {
  isActive: boolean;
}): React.CSSProperties => ({
  display: "block",
  padding: "10px 16px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  color: isActive ? "#fff" : "#94A3B8",
  backgroundColor: isActive ? "#4F46E5" : "transparent",
  marginBottom: "4px",
  transition: "all 0.15s",
});

export const Sidebar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { currentTenant } = useTenant();

  return (
    <aside
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#0F172A",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      {/* Logo / App name */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            color: "#fff",
            fontSize: "20px",
            fontWeight: 700,
            margin: 0,
          }}
        >
          MedPanel
        </h1>
        {/* Current tenant name */}
        <p style={{ color: "#64748B", fontSize: "12px", margin: "4px 0 0" }}>
          {currentTenant?.name ?? "No tenant selected"}
        </p>
      </div>

      {/* Navigation links */}
      <nav style={{ flex: 1 }}>
        <NavLink to="/" style={linkStyle} end>
          Dashboard
        </NavLink>
        <NavLink to="/patients" style={linkStyle}>
          Patients
        </NavLink>

        {/* Role-based nav: only admin and receptionist see Appointments.
            Doctors don't manage appointments — they just attend them.
            This is role-based access control (RBAC) in action. */}
        {currentUser?.role !== "doctor" && (
          <NavLink to="/appointments" style={linkStyle}>
            Appointments
          </NavLink>
        )}
      </nav>

      {/* Current user info at the bottom */}
      <div style={{ borderTop: "1px solid #1E293B", paddingTop: "16px" }}>
        <p style={{ color: "#94A3B8", fontSize: "13px", margin: "0 0 4px" }}>
          {currentUser?.name}
        </p>
        <p
          style={{
            color: "#64748B",
            fontSize: "12px",
            margin: "0 0 12px",
            textTransform: "capitalize",
          }}
        >
          {currentUser?.role}
        </p>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "8px",
            backgroundColor: "#1E293B",
            color: "#94A3B8",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            cursor: "pointer",
          }}
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};
