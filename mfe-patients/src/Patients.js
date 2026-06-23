import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PatientTable } from './components/PatientTable';
import { PatientDetail } from './components/PatientDetail';
import { SearchBar } from './components/SearchBar';
import { mockPatients } from './mocks/data';
const fetchPatients = () => Promise.resolve(mockPatients);
export const Patients = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [search, setSearch] = useState('');
    const [genderFilter, setGenderFilter] = useState('all');
    const { data: patients, isLoading } = useQuery({
        queryKey: ['patients'],
        queryFn: fetchPatients,
    });
    const filtered = (patients ?? []).filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.condition.toLowerCase().includes(search.toLowerCase());
        const matchesGender = genderFilter === 'all' || p.gender === genderFilter;
        return matchesSearch && matchesGender;
    });
    if (isLoading)
        return _jsx("p", { style: { padding: '40px', color: '#6B7280' }, children: "Loading patients..." });
    if (selectedPatient) {
        return (_jsx("div", { style: { padding: '24px' }, children: _jsx(PatientDetail, { patient: selectedPatient, onBack: () => setSelectedPatient(null) }) }));
    }
    return (_jsxs("div", { style: { padding: '24px' }, children: [_jsx("h2", { style: { margin: '0 0 24px', fontSize: '22px', color: '#111827' }, children: "Patient Records" }), _jsxs("div", { style: { display: 'flex', gap: '12px', marginBottom: '16px' }, children: [_jsx("div", { style: { flex: 1 }, children: _jsx(SearchBar, { value: search, onChange: e => setSearch(e.target.value), placeholder: "Search by name or condition..." }) }), _jsxs("select", { value: genderFilter, onChange: e => setGenderFilter(e.target.value), style: {
                            padding: '10px 14px',
                            fontSize: '14px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                            backgroundColor: '#fff',
                            cursor: 'pointer',
                        }, children: [_jsx("option", { value: "all", children: "All Genders" }), _jsx("option", { value: "male", children: "Male" }), _jsx("option", { value: "female", children: "Female" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs("p", { style: { margin: '0 0 12px', fontSize: '13px', color: '#6B7280' }, children: ["Showing ", filtered.length, " of ", patients?.length ?? 0, " patients"] }), _jsx(PatientTable, { patients: filtered, onSelect: setSelectedPatient })] }));
};
export default Patients;
