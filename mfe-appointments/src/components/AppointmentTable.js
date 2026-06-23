import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Button } from "shared-lib";
const nextStatus = {
    scheduled: "completed",
    completed: "cancelled",
    cancelled: "scheduled",
};
const nextStatusLabel = {
    scheduled: "Mark Complete",
    completed: "Mark Cancelled",
    cancelled: "Reschedule",
};
export const AppointmentTable = ({ appointments, onStatusChange, isUpdating, }) => {
    const thStyle = {
        textAlign: "left",
        padding: "10px 14px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#6B7280",
        textTransform: "uppercase",
        borderBottom: "1px solid #E5E7EB",
    };
    const tdStyle = {
        padding: "12px 14px",
        fontSize: "14px",
        color: "#111827",
        borderBottom: "1px solid #F3F4F6",
    };
    return (_jsxs("table", { style: {
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "10px",
            overflow: "hidden",
        }, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { style: thStyle, children: "Patient" }), _jsx("th", { style: thStyle, children: "Doctor" }), _jsx("th", { style: thStyle, children: "Department" }), _jsx("th", { style: thStyle, children: "Date" }), _jsx("th", { style: thStyle, children: "Time" }), _jsx("th", { style: thStyle, children: "Status" }), _jsx("th", { style: thStyle, children: "Action" })] }) }), _jsx("tbody", { children: appointments.map((appt) => (_jsxs("tr", { children: [_jsx("td", { style: tdStyle, children: appt.patientName }), _jsx("td", { style: tdStyle, children: appt.doctorName }), _jsx("td", { style: tdStyle, children: appt.department }), _jsx("td", { style: tdStyle, children: appt.date }), _jsx("td", { style: tdStyle, children: appt.time }), _jsx("td", { style: tdStyle, children: _jsx(Badge, { status: appt.status }) }), _jsx("td", { style: tdStyle, children: _jsx(Button, { label: nextStatusLabel[appt.status], size: "sm", variant: appt.status === "cancelled" ? "secondary" : "primary", disabled: isUpdating, onClick: () => onStatusChange(appt.id, nextStatus[appt.status]) }) })] }, appt.id))) })] }));
};
