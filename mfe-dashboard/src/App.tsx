import React from "react";
import { Dashboard } from "./Dashboard";

const App: React.FC = () => {
  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
      }}
    >
      <Dashboard />
    </div>
  );
};

export default App;
