import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@hareharun/medpanel-shared";

interface AdmissionsChartProps {
  data: { month: string; admissions: number }[];
}

export const AdmissionsChart: React.FC<AdmissionsChartProps> = ({ data }) => (
  <Card title="Patient Admissions — Last 6 Months">
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="admissions"
          stroke="#4F46E5"
          strokeWidth={2}
          dot={{ fill: "#4F46E5" }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>
);
