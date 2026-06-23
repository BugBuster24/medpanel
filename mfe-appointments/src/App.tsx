import React from "react";
import { Appointments } from "./Appointments";

const App: React.FC = () => (
  <div
    style={{
      fontFamily: "Inter, system-ui, sans-serif",
      backgroundColor: "#F9FAFB",
      minHeight: "100vh",
    }}
  >
    <Appointments />
  </div>
);

export default App;
