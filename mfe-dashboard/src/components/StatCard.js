import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "shared-lib";
const colorMap = {
    indigo: "#4F46E5",
    green: "#10B981",
    red: "#EF4444",
    orange: "#F59E0B",
};
export const StatCard = ({ title, value, color = "indigo", }) => (_jsxs(Card, { children: [_jsx("p", { style: { margin: 0, fontSize: "13px", color: "#6B7280", fontWeight: 500 }, children: title }), _jsx("p", { style: {
                margin: "8px 0 0",
                fontSize: "32px",
                fontWeight: 700,
                color: colorMap[color],
            }, children: value })] }));
