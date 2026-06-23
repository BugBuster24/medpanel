import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import { Card } from "shared-lib";
export const AdmissionsChart = ({ data }) => (_jsx(Card, { title: "Patient Admissions \u2014 Last 6 Months", children: _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(LineChart, { data: data, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#F3F4F6" }), _jsx(XAxis, { dataKey: "month", tick: { fontSize: 12 } }), _jsx(YAxis, { tick: { fontSize: 12 } }), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "admissions", stroke: "#4F46E5", strokeWidth: 2, dot: { fill: "#4F46E5" } })] }) }) }));
