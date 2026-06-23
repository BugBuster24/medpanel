import React from "react";
import { Patients } from "./Patients";

const App: React.FC = () => (
  <div
    style={{
      fontFamily: "Inter, system-ui, sans-serif",
      backgroundColor: "#F9FAFB",
      minHeight: "100vh",
    }}
  >
    <Patients />
  </div>
);

export default App;
