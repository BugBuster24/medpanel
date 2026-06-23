import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TenantProvider, AuthProvider, useAuth } from "shared-lib";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { MFELoader } from "./components/MFELoader";
import { RemoteDashboard, RemotePatients, RemoteAppointments } from "./remotes";

const queryClient = new QueryClient();

// A protected route wrapper — redirects to '/' if the user
// doesn't have the required role.
// This is a Higher Order Component (HOC) pattern in TypeScript.
const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  allowedRoles: string[];
}> = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppLayout: React.FC = () => (
  <div
    style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F9FAFB" }}
  >
    <Sidebar />
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <TopBar />
      <main style={{ flex: 1, overflow: "auto" }}>
        <Routes>
          <Route path="/" element={<MFELoader component={RemoteDashboard} />} />
          <Route
            path="/patients"
            element={<MFELoader component={RemotePatients} />}
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute allowedRoles={["admin", "receptionist"]}>
                <MFELoader component={RemoteAppointments} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  </div>
);

const App: React.FC = () => (
  // Provider order matters — AuthProvider is inside TenantProvider
  // so auth can access tenant context if needed in future.
  <TenantProvider>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </QueryClientProvider>
    </AuthProvider>
  </TenantProvider>
);

export default App;
