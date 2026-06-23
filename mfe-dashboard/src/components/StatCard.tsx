import React from "react";
import { Card } from "shared-lib";

interface StatCardProps {
  title: string;
  value: number | string;
  color?: "indigo" | "green" | "red" | "orange";
}

const colorMap: Record<string, string> = {
  indigo: "#4F46E5",
  green: "#10B981",
  red: "#EF4444",
  orange: "#F59E0B",
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  color = "indigo",
}) => (
  <Card>
    <p
      style={{ margin: 0, fontSize: "13px", color: "#6B7280", fontWeight: 500 }}
    >
      {title}
    </p>
    <p
      style={{
        margin: "8px 0 0",
        fontSize: "32px",
        fontWeight: 700,
        color: colorMap[color],
      }}
    >
      {value}
    </p>
  </Card>
);
