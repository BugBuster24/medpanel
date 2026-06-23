import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from '@tanstack/react-query';
import { StatCard } from './components/StatCard';
import { AdmissionsChart } from './components/AdmissionsChart';
import { DepartmentChart } from './components/DepartmentChart';
import { mockStats, mockAdmissionTrend, mockDepartmentData, } from './mocks/data';
// Instead of fetching from an API, we return mock data directly.
// We wrap it in a Promise to keep the React Query pattern identical —
// if you connect a real API later, you only change this function.
const fetchStats = () => Promise.resolve(mockStats);
const fetchAdmissions = () => Promise.resolve(mockAdmissionTrend);
const fetchDepartments = () => Promise.resolve(mockDepartmentData);
export const Dashboard = () => {
    const { data: stats } = useQuery({
        queryKey: ['stats'],
        queryFn: fetchStats,
    });
    const { data: admissions } = useQuery({
        queryKey: ['admissions'],
        queryFn: fetchAdmissions,
    });
    const { data: departments } = useQuery({
        queryKey: ['departments'],
        queryFn: fetchDepartments,
    });
    return (_jsxs("div", { style: { padding: '24px' }, children: [_jsx("h2", { style: { margin: '0 0 24px', fontSize: '22px', color: '#111827' }, children: "Dashboard Overview" }), _jsxs("div", { style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px',
                    marginBottom: '24px'
                }, children: [_jsx(StatCard, { title: "Total Patients", value: stats?.totalPatients ?? 0, color: "indigo" }), _jsx(StatCard, { title: "Appointments Today", value: stats?.appointmentsToday ?? 0, color: "green" }), _jsx(StatCard, { title: "Beds Available", value: stats?.bedsAvailable ?? 0, color: "orange" }), _jsx(StatCard, { title: "Beds Occupied", value: stats?.bedsOccupied ?? 0, color: "red" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [admissions && _jsx(AdmissionsChart, { data: admissions }), departments && _jsx(DepartmentChart, { data: departments })] })] }));
};
export default Dashboard;
