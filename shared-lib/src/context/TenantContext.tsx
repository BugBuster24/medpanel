import React, { createContext, useContext, useState } from "react";
import { Tenant } from "../types";

interface TenantContextValue {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
}

const TenantContext = createContext<TenantContextValue | null>(null);

const MOCK_TENANTS: Tenant[] = [
  { id: "1", name: "Apollo Hospitals", slug: "apollo" },
  { id: "2", name: "Fortis Healthcare", slug: "fortis" },
];

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(
    MOCK_TENANTS[0]
  );

  return (
    <TenantContext.Provider
      value={{ currentTenant, setCurrentTenant, tenants: MOCK_TENANTS }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = (): TenantContextValue => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
