import React from "react";
import { useAuth, useTenant, MOCK_USERS } from "shared-lib";

export const TopBar: React.FC = () => {
  const { currentUser, login } = useAuth();
  const { currentTenant, tenants, setCurrentTenant } = useTenant();

  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#fff",
        borderBottom: "1px solid #E5E7EB",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 24px",
        gap: "16px",
        flexShrink: 0,
      }}
    >
      {/* Tenant switcher — the core of multi-tenancy demo */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "13px", color: "#6B7280" }}>Tenant:</span>
        <select
          value={currentTenant?.id ?? ""}
          onChange={(e) => {
            const tenant = tenants.find((t) => t.id === e.target.value);
            if (tenant) setCurrentTenant(tenant);
          }}
          style={{
            padding: "6px 10px",
            fontSize: "13px",
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            backgroundColor: "#F9FAFB",
            cursor: "pointer",
          }}
        >
          {tenants.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {/* Role switcher — lets you demo different access levels */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "13px", color: "#6B7280" }}>Role:</span>
        <select
          value={currentUser?.id ?? ""}
          onChange={(e) => {
            const user = MOCK_USERS.find((u) => u.id === e.target.value);
            if (user) login(user);
          }}
          style={{
            padding: "6px 10px",
            fontSize: "13px",
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            backgroundColor: "#F9FAFB",
            cursor: "pointer",
          }}
        >
          {MOCK_USERS.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
