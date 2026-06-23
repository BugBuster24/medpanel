import React from "react";

interface CardProps {
  children: React.ReactNode;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, title }) => (
  <div
    style={{
      border: "1px solid #E5E7EB",
      borderRadius: "10px",
      padding: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}
  >
    {title && (
      <h3 style={{ margin: "0 0 16px", fontSize: "16px", color: "#111827" }}>
        {title}
      </h3>
    )}
    {children}
  </div>
);
