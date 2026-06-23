import React from "react";

// React.lazy() dynamically imports a component only when it's first rendered.
// The `import()` here doesn't fetch mfe_dashboard immediately —
// it only fetches it when the user navigates to the Dashboard route.
//
// The URLs point to each MFE's running dev server.
// In production these would point to deployed URLs.
// This is the core of Module Federation — the shell fetches
// remote code at RUNTIME, not at build time.

export const RemoteDashboard = React.lazy(
  () => import("mfe_dashboard/Dashboard"),
);

export const RemotePatients = React.lazy(() => import("mfe_patients/Patients"));

export const RemoteAppointments = React.lazy(
  () => import("mfe_appointments/Appointments"),
);
